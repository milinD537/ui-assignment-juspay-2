import { TDialogItem } from "@/lib/types"
import {
  Home,
  Package,
  Building2,
  Users,
  BookOpen,
  LifeBuoy,
  FlaskConical,
  Leaf,
  BarChart3,
  Mail,
  Code2,
  Cloud,
  Handshake,
  Cpu,
  ShieldCheck,
  ChartBar,
  Settings,
  Wrench,
  Zap,
  Server
} from "lucide-react"

	const dialogDatChildren2 = [
          {
            title: "System Architecture",
            description: "Scalable system design and planning",
            icon: <Server />,
          },
          {
            title: "Performance Optimization",
            description: "Application and system optimization",
            icon: <Zap />,
          },
          {
            title: "Security Audits",
            description: "Comprehensive security assessments",
            icon: <ShieldCheck />,
          },
]
		

const dialogDatChildren1 = [
      {
        title: "Software Solutions",
        description: "Custom software development and deployment",
        icon: <Code2 />,
        children: dialogDatChildren2,
      },
      {
        title: "Cloud & Infrastructure",
        description: "Scalable cloud solutions and infrastructure",
        icon: <Cloud />,
      },
      {
        title: "Consulting Services",
        description: "Expert guidance and strategic support",
        icon: <Handshake />,
      },
      {
        title: "Digital Transformation",
        description: "Comprehensive digital transformation strategies",
        icon: <Cpu />,
      },
      {
        title: "Cybersecurity Consulting",
        description: "Comprehensive cybersecurity services and solutions",
        icon: <ShieldCheck />,
      },
      {
        title: "Data & Analytics Consulting",
        description: "Data strategy, analytics, and business intelligence",
        icon: <ChartBar />,
      },
      {
        title: "DevOps & Platform Engineering",
        description: "DevOps transformation and platform engineering",
        icon: <Settings />,
      },
      {
        title: "Support & Maintenance",
        description: "Ongoing maintenance and support services",
        icon: <Wrench />,
      },
    ]


export const dialogData: TDialogItem = {
	children: [
  {
    title: "Home",
    description: "Welcome to our comprehensive platform",
    icon: <Home />,
    children: dialogDatChildren1,
  },
  {
    title: "Products & Services",
    description: "Explore our comprehensive offerings",
    icon: <Package />,
    children: dialogDatChildren1,
  },
  {
    title: "Industry Solutions",
    description: "Specialized solutions for different industries",
    icon: <Building2 />,
    children: dialogDatChildren1,
  },
  {
    title: "Company",
    description: "Learn about our organization and culture",
    icon: <Users />,
    children: dialogDatChildren2,
  },
  {
    title: "Resources",
    description: "Knowledge base, tools, and learning materials",
    icon: <BookOpen />,
    children: dialogDatChildren1,
  },
  {
    title: "Support",
    description: "Get help and support when you need it",
    icon: <LifeBuoy />,
    children: dialogDatChildren2,
  },
  {
    title: "Research & Innovation",
    description: "Cutting-edge research and innovation initiatives",
    icon: <FlaskConical />,
    children: dialogDatChildren1,
  },
  {
    title: "Sustainability",
    description: "Environmental responsibility and sustainable technology",
    icon: <Leaf />,
    children: dialogDatChildren1,
  },
  {
    title: "Investor Relations",
    description: "Financial information and investor resources",
    icon: <BarChart3 />,
    children: dialogDatChildren2,
  },
  {
    title: "Contact",
    description: "Get in touch with our team",
    icon: <Mail />,
    children: dialogDatChildren1,
  },
]
}
