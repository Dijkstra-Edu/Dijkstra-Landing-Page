/**
 * Bundled snapshot of the Dijkstra-Edu GitHub team hierarchy.
 *
 * Source: the organisation's Teams page (github.com/orgs/Dijkstra-Edu/teams).
 * It is used
 *   1. as the offline fallback when no GitHub token is configured or GitHub
 *      cannot be reached, and
 *   2. to enrich live data with specialization icons.
 *
 * In live mode the hierarchy is rebuilt from the GitHub API (`parentTeam`),
 * so this file never has to be kept perfectly in sync by hand.
 *
 * Notes on fidelity:
 * - `members` are the direct member counts shown on GitHub at snapshot time.
 * - Names marked `nameTruncated` were cut off in the source listing; the full
 *   name is our best reading (e.g. "Authentication Server and Aâ€¦"). Their
 *   slugs are therefore marked unconfident and GitHub links fall back to a
 *   team search.
 * - The listing is a flattened tree. Nesting was reconstructed from order and
 *   leaf markers; in particular, the SDE teams are placed under the
 *   "Software Dev Architects" sub-group and Backend/Frontend under
 *   "Full Stack Software Dev (FE+BE)".
 */

import { SPECIALIZATION_ICONS as I } from "./icons";

export type SeedTeam = {
  /** Full GitHub team name, including the "[Kind]" prefix. */
  name: string;
  description?: string;
  members: number;
  icon?: string;
  nameTruncated?: boolean;
  children?: SeedTeam[];
};

export const seedTree: SeedTeam[] = [
  {
    name: "[Dept] Engineering & Technical Teams",
    members: 1,
    children: [
      {
        name: "[Group] AI & ML Engineering",
        description: "The AI and ML team of Dijkstra!",
        members: 2,
        icon: I.ML_ENGINEERING,
        children: [
          {
            name: "[Team] Data Engineering",
            description: "Data Piplining",
            members: 1,
            icon: I.DATA_ENGINEERING,
          },
          {
            name: "[Team] Data Science & Analytics",
            description: "Data Science & Analytics",
            members: 1,
            icon: I.DATA_SCIENCE_ANALYSIS,
          },
          {
            name: "[Team] ML Engineering",
            description: "Applied ML Engineering",
            members: 0,
            icon: I.ML_ENGINEERING,
            children: [{ name: "[Project] Dijkstra GPT", members: 2 }],
          },
          {
            name: "[Team] ML Research",
            description: "ML Research",
            members: 1,
            icon: I.ML_RESEARCH,
          },
        ],
      },
      {
        name: "[Group] Software Development Engineering",
        description: "All things Software",
        members: 1,
        icon: I.FULLSTACK,
        children: [
          {
            name: "[Sub-Group] Software Dev Architects",
            description:
              "Software Architects - More experienced individuals who work on the overall anâ€¦",
            members: 1,
            children: [
              {
                name: "[Team] Full Stack Software Dev (FE+BE)",
                description: "All members of Full Stack Software Development",
                members: 1,
                icon: I.FULLSTACK,
                children: [
                  {
                    name: "[Projects] Full Stack Developmental Projects",
                    nameTruncated: true,
                    members: 1,
                    children: [
                      {
                        name: "[Project] Blog Mechanism and Site",
                        description: "Blog Mechanism and Site",
                        members: 5,
                      },
                      { name: "[Project] Dijkstra Jira", members: 2 },
                    ],
                  },
                  {
                    name: "[Team] Backend (BE)",
                    description: "Backend Engineers!",
                    members: 1,
                    icon: I.BACKEND,
                    children: [
                      {
                        name: "[Project] Authentication Server and API Gateway",
                        nameTruncated: true,
                        description:
                          "Hodor - Dijkstra's Authentication Server and API Gateway",
                        members: 2,
                      },
                      {
                        name: "[Project] Certificate Generator (Dataforge)",
                        nameTruncated: true,
                        description: "Certificate Generator",
                        members: 4,
                      },
                      {
                        name: "[Project] GitRipper - Github Statistics",
                        nameTruncated: true,
                        members: 4,
                      },
                      {
                        name: "[Project] Helios - Ranking Algo",
                        description: "Team behind Dijkstra's Ranking Algorithm",
                        members: 4,
                      },
                    ],
                  },
                  {
                    name: "[Team] Frontend (FE)",
                    description: "Frontend Engineers are a part of this team",
                    members: 1,
                    icon: I.FRONTEND,
                    children: [
                      {
                        name: "[Project] Learning Hub",
                        description: "Learning Hub",
                        members: 2,
                      },
                      { name: "[Project] Onboarding", members: 2 },
                      {
                        name: "[Project] Resume and CV Builder",
                        description: "Resume and CV Builder",
                        members: 3,
                      },
                    ],
                  },
                ],
              },
              {
                name: "[Team] Game Dev",
                description: "Unreal Engine, Unity, Other Game Dev Software",
                members: 1,
                icon: I.GAME_DEV,
              },
              {
                name: "[Team] Mobile Dev",
                description: "All things with respect to Mobile Development!",
                members: 1,
                icon: I.CROSS_PLATFORM_MOBILE,
                children: [
                  {
                    name: "[Team] Android Mobile Dev",
                    description: "Android Mobile Dev",
                    members: 1,
                    icon: I.ANDROID,
                  },
                  {
                    name: "[Team] Cross Platform Mobile App Development",
                    nameTruncated: true,
                    description:
                      "Cross Platform Mobile App Development - Flutter and React Native!",
                    members: 1,
                    icon: I.CROSS_PLATFORM_MOBILE,
                  },
                  {
                    name: "[Team] IOS Mobile Dev",
                    description: "IOS Mobile Dev",
                    members: 1,
                    icon: I.IOS,
                  },
                ],
              },
              {
                name: "[Team] PC specific Dev",
                description: "For PC apps!",
                members: 1,
                icon: I.CROSS_PLATFORM_PC,
                children: [
                  {
                    name: "[Team] Cross Platfrom PC Dev",
                    description:
                      "Cross Platfrom PC Dev - Electron Js and Tauri",
                    members: 1,
                    icon: I.CROSS_PLATFORM_PC,
                  },
                  {
                    name: "[Team] Linux Software Dev",
                    description: "Linux Software Dev",
                    members: 1,
                    icon: I.LINUX,
                  },
                  {
                    name: "[Team] MacOS Software Dev",
                    description: "MacOS Software Dev",
                    members: 1,
                    icon: I.MACOS,
                  },
                  {
                    name: "[Team] Windows Software Dev",
                    description: "Windows Software Dev",
                    members: 1,
                    icon: I.WINDOWS,
                  },
                ],
              },
              {
                name: "[Team] Systems Engineering",
                members: 1,
                icon: I.COMPUTER_SYSTEMS,
                children: [
                  {
                    name: "[Team] Compilers",
                    description:
                      "All things with regards to Programming Languages!",
                    members: 1,
                    icon: I.COMPILERS,
                  },
                  {
                    name: "[Team] Computer Systems",
                    description: "Kernel Dev, Operating Systems",
                    members: 1,
                    icon: I.COMPUTER_SYSTEMS,
                  },
                  {
                    name: "[Team] Embedded and IoT Dev",
                    description: "Embedded and IoT Dev",
                    members: 1,
                    icon: I.EMBEDDED_IOT,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "[Group] Software Infrastructure",
        description: "All members of the Softwre infrastructure side of things",
        members: 1,
        icon: I.SOFTWARE_INFRASTRUCTURE,
        children: [
          {
            name: "[Team] CI/CD (Continuous Integration/Deployment)",
            nameTruncated: true,
            description: "CI/CD (Continuous Integration/Deployment)",
            members: 1,
            icon: I.CI_CD,
          },
          {
            name: "[Team] Cloud Engineering",
            description: "Cloud Engineering",
            members: 1,
            icon: I.CLOUD,
          },
          {
            name: "[Team] DevOps",
            description: "All things DevOps!",
            members: 5,
            icon: I.DEVOPS,
          },
          {
            name: "[Team] MLOps",
            description: "All things MLOps",
            members: 1,
            icon: I.MLOPS,
          },
          {
            name: "[Team] Site Reliability Engineers (SRE's)",
            nameTruncated: true,
            description: "Site Reliability Engineers (SRE's)",
            members: 1,
            icon: I.SITE_RELIABILITY,
          },
        ],
      },
      {
        name: "[Group] Software Security",
        description: "Software Security",
        members: 1,
        icon: I.DEVSECOPS,
        children: [
          {
            name: "[Team] Application Security",
            description: "Application Security",
            members: 1,
            icon: I.APPLICATION_SECURITY,
          },
          {
            name: "[Team] DevSecOps",
            description: "DevSecOps",
            members: 1,
            icon: I.DEVSECOPS,
            children: [
              {
                name: "[Project] QA-Gate",
                description:
                  "Implementation of the QA Gate Functionality for various Dijkstra Projects",
                members: 3,
              },
            ],
          },
          {
            name: "[Team] Exploits Team",
            description:
              "Team for people trying to exploit the Dijkstra System - Helps us learn how thâ€¦",
            members: 1,
            icon: I.APPLICATION_SECURITY,
          },
          {
            name: "[Team] Platform Security",
            description: "Platform Security",
            members: 1,
            icon: I.PLATFORM_SECURITY,
          },
        ],
      },
      {
        name: "[Group] Testing and QA",
        description: "Testing and QA",
        members: 1,
        icon: I.QUALITY_ASSURANCE,
        children: [
          {
            name: "[Team] QA Testing",
            description: "QA Testing",
            members: 1,
            icon: I.QUALITY_ASSURANCE,
          },
          {
            name: "[Team] Software Development Engineering in Testing (SDET's)",
            nameTruncated: true,
            description: "Software Development Engineering in Testing (SDET's)",
            members: 1,
            icon: I.SDE_TEST,
          },
          {
            name: "[Team] Testing Automation",
            description: "Testing Automation",
            members: 1,
            icon: I.TEST_AUTOMATION,
          },
        ],
      },
    ],
  },
  {
    name: "[Dept] Mentors",
    description: "Dem wise ones",
    members: 5,
  },
  {
    name: "[Dept] Non-Engineering Teams",
    description: "Non-Technical Teams",
    members: 1,
    children: [
      {
        name: "[Group] Design",
        description: "Dijkstra's Design team",
        members: 1,
        icon: I.UI_UX,
        children: [
          {
            name: "[Team] UI/UX and Design",
            description:
              "UI/UX members deal with the general design of Dijkstra's front end applicatioâ€¦",
            members: 2,
            icon: I.UI_UX,
          },
        ],
      },
      {
        name: "[Group] Docs & Technical Writing",
        description: "Technical Writing",
        members: 3,
        icon: I.TECHNICAL_WRITING,
      },
      {
        name: "[Group] Outreach",
        members: 1,
        children: [
          {
            name: "[Team] Content Creation & Socials",
            description:
              "This team handles content generation for both the Application, as well as forâ€¦",
            members: 5,
          },
        ],
      },
      {
        name: "[Group] Product",
        description: "Product Design, Management and Development",
        members: 2,
        icon: I.PRODUCT_MANAGEMENT,
        children: [
          {
            name: "[Team] Business Analysts",
            description:
              "Team incharge for directing Dijkstra's business interests.",
            members: 5,
            icon: I.PRODUCT_MANAGEMENT,
          },
          {
            name: "[Team] Product Design and Development",
            description: "Product Design and Development",
            members: 2,
            icon: I.PRODUCT_ENGINEERING,
          },
        ],
      },
    ],
  },
  {
    name: "[Dept] Organisation",
    description:
      "Members of the Organization team function as the administrators of Dijkstra. â€¦",
    members: 6,
  },
];
