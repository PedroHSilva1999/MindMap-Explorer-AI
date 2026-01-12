
import { AnnotationNode } from './types';

export const SPRING_DATA: AnnotationNode = {
  name: "Spring Annotations",
  type: "root",
  color: "#64748b",
  children: [
    {
      name: "Boot",
      type: "category",
      color: "#15803d",
      children: [
        { name: "@SpringBootApplication", type: "annotation" },
        { name: "@EnableAutoConfiguration", type: "annotation" },
        { name: "@ConfigurationProperties", type: "annotation" },
      ]
    },
    {
      name: "Stereotype",
      type: "category",
      color: "#65a30d",
      children: [
        { name: "@Component", type: "annotation" },
        { name: "@Repository", type: "annotation" },
        { name: "@Service", type: "annotation" },
        { name: "@Controller | @RestController", type: "annotation" },
      ]
    },
    {
      name: "Core",
      type: "category",
      color: "#0d9488",
      children: [
        {
          name: "Beans",
          type: "category",
          color: "#2dd4bf",
          children: [
            { name: "@Autowired", type: "annotation" },
            { name: "@Qualifier", type: "annotation" },
            { name: "@Value", type: "annotation" },
          ]
        },
        {
          name: "Context",
          type: "category",
          color: "#5eead4",
          children: [
            { name: "@Configuration", type: "annotation" },
            { name: "@ComponentScan", type: "annotation" },
            { name: "@Bean", type: "annotation" },
            { name: "@Lazy", type: "annotation" },
            { name: "@Primary", type: "annotation" },
            { name: "@Scope", type: "annotation" },
            { name: "@PropertySource", type: "annotation" },
            { name: "@Profile", type: "annotation" },
          ]
        }
      ]
    },
    {
      name: "Web",
      type: "category",
      color: "#0369a1",
      children: [
        { name: "@RequestMapping", type: "annotation" },
        { name: "@PostMapping", type: "annotation" },
        { name: "@GetMapping", type: "annotation" },
        { name: "@PutMapping", type: "annotation" },
        { name: "@DeleteMapping", type: "annotation" },
        { name: "@RequestBody", type: "annotation" },
        { name: "@PathVariable", type: "annotation" },
        { name: "@RequestParam", type: "annotation" },
        { name: "@CrossOrigin", type: "annotation" },
      ]
    },
    {
      name: "Data",
      type: "category",
      color: "#7c3aed",
      children: [
        { name: "@Entity", type: "annotation" },
        { name: "@Id", type: "annotation" },
        { name: "@GeneratedValue", type: "annotation" },
        { name: "@Table", type: "annotation" },
        { name: "@Column", type: "annotation" },
        { name: "@ManyToOne", type: "annotation" },
        { name: "@OneToMany", type: "annotation" },
        { name: "@JoinColumn", type: "annotation" },
        { name: "@Transactional", type: "annotation" },
        { name: "@Query", type: "annotation" },
      ]
    },
    {
      name: "Security",
      type: "category",
      color: "#be123c",
      children: [
        { name: "@EnableWebSecurity", type: "annotation" },
        { name: "@EnableGlobalMethodSecurity", type: "annotation" },
        { name: "@PreAuthorize", type: "annotation" },
        { name: "@PostAuthorize", type: "annotation" },
        { name: "@AuthenticationPrincipal", type: "annotation" },
      ]
    }
  ]
};
