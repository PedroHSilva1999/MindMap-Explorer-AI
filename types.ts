
export interface AnnotationNode {
  name: string;
  description?: string;
  children?: AnnotationNode[];
  color?: string;
  type?: 'category' | 'annotation' | 'root';
}

export interface TreePoint {
  x: number;
  y: number;
}

export interface AIAnnotationDetail {
  summary: string;
  useCase: string;
  codeExample: string;
  tips: string[];
}
