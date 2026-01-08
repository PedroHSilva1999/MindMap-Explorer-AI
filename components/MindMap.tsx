
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { SPRING_DATA } from '../constants';
import { AnnotationNode } from '../types';

interface Props {
  onNodeClick: (name: string) => void;
}

export const MindMap: React.FC<Props> = ({ onNodeClick }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    d3.select(svgRef.current).selectAll("*").remove();

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const g = svg.append("g");

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 3])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);

    const treeLayout = d3.tree<AnnotationNode>()
      .size([height - 100, width - 300])
      .separation((a, b) => (a.parent === b.parent ? 1.2 : 2));

    const root = d3.hierarchy(SPRING_DATA);
    treeLayout(root);

    svg.call(zoom.transform, d3.zoomIdentity.translate(150, 50).scale(0.9));

    const linkGenerator = d3.linkHorizontal<any, any>()
      .x(d => d.y)
      .y(d => d.x);

    const links = g.selectAll(".link")
      .data(root.links())
      .enter()
      .append("path")
      .attr("class", "link-path")
      .attr("d", linkGenerator as any)
      .attr("stroke", (d: any) => {
        const target = d.target.data as AnnotationNode;
        const source = d.source.data as AnnotationNode;
        return target.color || source.color || "#475569";
      });

    const nodes = g.selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", d => `translate(${d.y},${d.x})`)
      .style("cursor", "pointer")
      .on("click", (event, d) => {
        onNodeClick(d.data.name);
      });

    nodes.append("circle")
      .attr("r", (d: any) => {
        if (d.data.type === 'root') return 8;
        if (d.data.type === 'category') return 6;
        return 4;
      })
      .attr("fill", (d: any) => d.data.color || "#475569")
      .attr("class", "node-circle shadow-lg")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .on("mouseover", function () {
        d3.select(this).transition().attr("r", 10);
      })
      .on("mouseout", function (event, d: any) {
        d3.select(this).transition().attr("r", (d.data.type === 'root' ? 8 : (d.data.type === 'category' ? 6 : 4)));
      });

    nodes.append("text")
      .attr("dy", ".35em")
      .attr("x", d => (d.children ? -15 : 15))
      .attr("text-anchor", d => (d.children ? "end" : "start"))
      .attr("class", "node-text")
      .attr("fill", "#ffffff")
      .attr("font-size", "14px")
      .attr("font-weight", "500")
      .text(d => d.data.name)
      .style("text-shadow", "0 2px 6px rgba(0,0,0,0.9), 0 0 3px rgba(0,0,0,0.5)");

    const handleResize = () => {
      const newWidth = containerRef.current?.clientWidth || width;
      const newHeight = containerRef.current?.clientHeight || height;
      svg.attr("width", newWidth).attr("height", newHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [onNodeClick]);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <svg ref={svgRef} className="w-full h-full"></svg>
      <div className="absolute bottom-6 left-6 pointer-events-none text-slate-500 text-xs italic space-y-1">
        <p>• Click on leaf nodes (annotations) to see AI details</p>
        <p>• Pan to move, scroll to zoom</p>
      </div>
    </div>
  );
};
