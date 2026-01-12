
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { SPRING_DATA } from '../constants';
import { AnnotationNode } from '../types';

interface Props {
  data: AnnotationNode;
  onNodeClick: (name: string) => void;
}

export const MindMap: React.FC<Props> = ({ data, onNodeClick }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || !data) return;

    const timer = setTimeout(() => {
      if (!svgRef.current || !containerRef.current) return;

      d3.select(svgRef.current).selectAll("*").remove();

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      const svg = d3.select(svgRef.current)
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet");

      const g = svg.append("g");

      const zoom = d3.zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.1, 5])
        .on("zoom", (event) => {
          g.attr("transform", event.transform);
        });

      svg.call(zoom);

      // Layout dinâmico baseado na quantidade de dados
      const root = d3.hierarchy(data);
      const nodeCount = root.descendants().length;
      const levelCount = root.height;

      // Espaçamento dinâmico
      const dynamicHeight = Math.max(height, nodeCount * 22);
      const dynamicWidth = Math.max(width, levelCount * 300);

      const treeLayout = d3.tree<AnnotationNode>()
        .size([dynamicHeight - 80, dynamicWidth - 350])
        .separation((a, b) => (a.parent === b.parent ? 1.5 : 2.5));

      treeLayout(root);

      const isMobile = width < 768;
      const initialScale = isMobile ? 0.5 : 0.75;
      const initialX = isMobile ? 20 : 80;
      const initialY = isMobile ? height / 4 : 50;

      svg.call(zoom.transform, d3.zoomIdentity.translate(initialX, initialY).scale(initialScale));

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
        .attr("x", d => (d.children ? (isMobile ? -8 : -15) : (isMobile ? 8 : 15)))
        .attr("text-anchor", d => (d.children ? "end" : "start"))
        .attr("class", "node-text")
        .attr("fill", "#ffffff")
        .attr("font-size", isMobile ? "11px" : "14px")
        .attr("font-weight", "500")
        .text(d => d.data.name)
        .style("text-shadow", "0 2px 6px rgba(0,0,0,0.9), 0 0 3px rgba(0,0,0,0.5)");

      const handleResize = () => {
        if (!containerRef.current) return;
        const newWidth = containerRef.current.clientWidth;
        const newHeight = containerRef.current.clientHeight;
        svg.attr("viewBox", `0 0 ${newWidth} ${newHeight}`);
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, 150);

    return () => clearTimeout(timer);
  }, [onNodeClick, data]);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <svg ref={svgRef} className="w-full h-full"></svg>
      <div className="absolute bottom-6 left-6 pointer-events-none text-slate-500 text-xs italic space-y-1">
        <p>• Clique em qualquer nó para ver detalhes da IA</p>
        <p>• Arraste para mover, scroll para zoom</p>
      </div>
    </div>
  );
};
