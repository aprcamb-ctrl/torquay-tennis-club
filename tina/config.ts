import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || undefined,
  // Get this from tina.io
  token: process.env.TINA_TOKEN || undefined,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  // Uncomment to allow cross-origin requests from non-localhost origins
  // during local development (e.g. GitHub Codespaces, Gitpod, Docker).
  // Use 'private' to allow all private-network IPs (WSL2, Docker, etc.)
  // server: {
  //   allowedOrigins: ['https://your-codespace.github.dev'],
  // },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH_TOKEN || '',
      stopwordLanguages: ['eng'],
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/r/content-modelling-collections/
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "global",
        label: "Global Settings",
        path: "content/global",
        format: "json",
        ui: {
          global: true,
        },
        fields: [
          {
            type: "object",
            list: true,
            name: "sports",
            label: "Sport Quick Links",
            ui: {
              itemProps: (item) => {
                return { label: item?.title || "New Sport Link" };
              },
            },
            fields: [
              { type: "string", name: "title", label: "Sport Title" },
              { type: "image", name: "image", label: "Background Image" },
              { type: "string", name: "link", label: "Page Link" },
              { type: "boolean", name: "featured", label: "Highlight as Popular?" }
            ]
          }
        ]
      },
      {
        name: "coaching",
        label: "Coaching Page",
        path: "content/pages",
        format: "json",
        ui: {
          router: ({ document }) => {
            if (document._sys.filename === "coaching") {
              return `/coaching`;
            }
            return undefined;
          },
        },
        fields: [
          {
            type: "object",
            list: true,
            name: "events",
            label: "Upcoming Events",
            ui: {
              itemProps: (item) => ({ label: item?.name || "New Event" }),
            },
            fields: [
              { type: "string", name: "name", label: "Event Name" },
              { type: "string", name: "date", label: "Date" },
              { type: "string", name: "time", label: "Time" },
              { type: "string", name: "location", label: "Location" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              { type: "image", name: "image", label: "Image" },
              { type: "string", name: "bookingUrl", label: "Booking URL" },
            ],
          },
          {
            type: "object",
            list: true,
            name: "programs",
            label: "Programs",
            ui: {
              itemProps: (item) => ({ label: item?.title || "New Program" }),
            },
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              { type: "string", name: "icon", label: "Icon Name (Lucide)" },
              { type: "string", name: "color", label: "Color Classes (e.g. bg-blue-50 text-blue-600)" },
            ],
          },
          {
            type: "object",
            list: true,
            name: "programDetails",
            label: "Program Details",
            ui: {
              itemProps: (item) => ({ label: item?.title || "New Detail" }),
            },
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "subtitle", label: "Subtitle" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              { type: "string", list: true, name: "highlights", label: "Highlights" },
              { type: "string", name: "icon", label: "Icon Name (Lucide)" },
              { type: "string", name: "color", label: "Color Gradient (e.g. from-blue-500 to-blue-600)" },
              { type: "string", name: "bgAccent", label: "BG Accent (e.g. bg-blue-50)" },
              { type: "string", name: "textAccent", label: "Text Accent (e.g. text-blue-600)" },
            ],
          },
          {
            type: "object",
            list: true,
            name: "coaches",
            label: "Coaches",
            ui: {
              itemProps: (item) => ({ label: item?.name || "New Coach" }),
            },
            fields: [
              { type: "string", name: "name", label: "Name" },
              { type: "string", name: "role", label: "Role" },
              { type: "string", name: "specialty", label: "Specialty" },
              { type: "string", name: "bio", label: "Bio", ui: { component: "textarea" } },
              { type: "image", name: "image", label: "Photo" },
              { type: "string", name: "icon", label: "Icon Name (Lucide)" },
            ],
          },
        ],
      },
    ],
  },
});
