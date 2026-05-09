import { useState, useEffect, useRef } from "react";































































const TESTIMONIALS = [
  {
    quote: "She is lead by definition. She has put into place processes, practices and the design system that we all use now in our component library. It can't be easy to join a company that has never used a dedicated designer/design approach but she came in and has completed our SDLC.",
    name: "Engineering Team",
    company: "ChilliPharm",
    color: "#7C3AED",
    initial: "C",
  },
  {
    quote: "Jess is an exceptional UX lead, and any team would be lucky to have her. Her designs are always thoughtful, user-focused, and beautifully executed—with an incredible eye for detail. Jess has a natural ability to lead, mentoring junior designers with clarity and care, helping them thrive. She's also a strong advocate for efficiency and was the driving force behind our design system.",
    name: "Director of Product",
    company: "ChilliPharm",
    color: "#2563EB",
    initial: "C",
  },
  {
    quote: "Jess is a true UX problem solver. I was amazed by her high level of focus, dedication and amazing attention to detail. She can converse to understand all views, extract the information required then turn it into a UX solution that by far satisfies the requirement with a sprinkle of creative flair. A real asset.",
    name: "Senior Stakeholder",
    company: "Momentum Energy",
    color: "#ff3e3e",
    initial: "M",
  },
  {
    quote: "Working with Jess during my time as Product Manager was a pleasure. Her high standards and knowledge of UX/UI principles in different situations and for different devices helped shape the new website we launched in November 2019 that played a key factor in increasing online sales.",
    name: "Product Manager",
    company: "Momentum Energy",
    color: "#059669",
    initial: "M",
  },
  {
    quote: "I managed Jess during her time at Momentum Energy. She was a pleasure to work with and a key hire, given she was our first internal UX resource. Jess' attention to detail, ensuring everything was pixel perfect across all devices, set a high standard that rubbed off within the rest of the business. Always wanting to get better, take on feedback and be a team player are all points to myself recommending her to any business lucky to have her.",
    name: "Digital Manager",
    company: "Momentum Energy",
    color: "#0891B2",
    initial: "M",
  },
  {
    quote: "Jess worked with me at Vertu for a year and a half. During this time I came to trust her attention to detail and work ethic to deliver top quality UI layouts, style guides and graphical assets. Her flexible and approachable attitude made her a delight to have on the team.",
    name: "Design Lead",
    company: "Vertu",
    color: "#7C3AED",
    initial: "V",
  },
];

const AI_TOOLS = [
  {
    name: "Claude",
    by: "Anthropic",
    use: "Research synthesis, copy, design critique, prototyping",
    svgIcon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBjbGFzcz0idy1mdWxsIiBmaWxsPSJoc2woMTQuOCwgNjMuMSUsIDU5LjYlKSI+PHBhdGggZD0ibTE5LjYgNjYuNSAxOS43LTExIC4zLTEtLjMtLjVoLTFsLTMuMy0uMi0xMS4yLS4zTDE0IDUzbC05LjUtLjUtMi40LS41TDAgNDlsLjItMS41IDItMS4zIDIuOS4yIDYuMy41IDkuNS42IDYuOS40TDM4IDQ5LjFoMS42bC4yLS43LS41LS40LS40LS40TDI5IDQxbC0xMC42LTctNS42LTQuMS0zLTItMS41LTItLjYtNC4yIDIuNy0zIDMuNy4zLjkuMiAzLjcgMi45IDggNi4xTDM3IDM2bDEuNSAxLjIuNi0uNC4xLS4zLS43LTEuMUwzMyAyNWwtNi0xMC40LTIuNy00LjMtLjctMi42Yy0uMy0xLS40LTItLjQtM2wzLTQuMkwyOCAwbDQuMi42TDMzLjggMmwyLjYgNiA0LjEgOS4zTDQ3IDI5LjlsMiAzLjggMSAzLjQuMyAxaC43di0uNWwuNS03LjIgMS04LjcgMS0xMS4yLjMtMy4yIDEuNi0zLjggMy0yTDYxIDIuNmwyIDIuOS0uMyAxLjgtMS4xIDcuN0w1OSAyNy4xbC0xLjUgOC4yaC45bDEtMS4xIDQuMS01LjQgNi45LTguNiAzLTMuNUw3NyAxM2wyLjMtMS44aDQuM2wzLjEgNC43LTEuNCA0LjktNC40IDUuNi0zLjcgNC43LTUuMyA3LjEtMy4yIDUuNy4zLjRoLjdsMTItMi42IDYuNC0xLjEgNy42LTEuMyAzLjUgMS42LjQgMS42LTEuNCAzLjQtOC4yIDItOS42IDItMTQuMyAzLjMtLjIuMS4yLjMgNi40LjYgMi44LjJoNi44bDEyLjYgMSAzLjMgMiAxLjkgMi43LS4zIDItNS4xIDIuNi02LjgtMS42LTE2LTMuOC01LjQtMS4zaC0uOHYuNGw0LjYgNC41IDguMyA3LjVMODkgODAuMWwuNSAyLjQtMS4zIDItMS40LS4yLTkuMi03LTMuNi0zLTgtNi44aC0uNXYuN2wxLjggMi43IDkuOCAxNC43LjUgNC41LS43IDEuNC0yLjYgMS0yLjctLjYtNS44LTgtNi05LTQuNy04LjItLjUuNC0yLjkgMzAuMi0xLjMgMS41LTMgMS4yLTIuNS0yLTEuNC0zIDEuNC02LjIgMS42LTggMS4zLTYuNCAxLjItNy45LjctMi42di0uMkg0OUw0MyA3MmwtOSAxMi4zLTcuMiA3LjYtMS43LjctMy0xLjUuMy0yLjhMMjQgODZsMTAtMTIuOCA2LTcuOSA0LTQuNi0uMS0uNWgtLjNMMTcuMiA3Ny40bC00LjcuNi0yLTIgLjItMyAxLTEgOC01LjVaIj48L3BhdGg+PC9zdmc+",
    iconBg: "#FBF0EC",
    iconPad: 6,
    color: "#ff3e3e",
  },
  {
    name: "Lovable",
    by: "Lovable AI",
    use: "Rapid UI prototyping, front-end generation, component iteration",
    svgIcon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIxIiBoZWlnaHQ9IjEyMiIgdmlld0JveD0iMCAwIDEyMSAxMjIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxtYXNrIGlkPSJtYXNrMF81NzJfMzE5IiBzdHlsZT0ibWFzay10eXBlOmFscGhhIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4PSIwIiB5PSIwIiB3aWR0aD0iMTIxIiBoZWlnaHQ9IjEyMiI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMzYuMDY4NyAwQzU1Ljk4ODggMCA3Mi4xMzczIDE2LjE1NTEgNzIuMTM3MyAzNi4wODM1VjQ5Ljc5NzVIODQuMTQxQzEwNC4wNjEgNDkuNzk3NSAxMjAuMjEgNjUuOTUyNiAxMjAuMjEgODUuODgwOUMxMjAuMjEgMTA1LjgwOSAxMDQuMDYxIDEyMS45NjQgODQuMTQxIDEyMS45NjRIMFYzNi4wODM1QzAgMTYuMTU1MSAxNi4xNDg1IDAgMzYuMDY4NyAwWiIgZmlsbD0idXJsKCNwYWludDBfbGluZWFyXzU3Ml8zMTkpIi8+CjwvbWFzaz4KPGcgbWFzaz0idXJsKCNtYXNrMF81NzJfMzE5KSI+CjxnIGZpbHRlcj0idXJsKCNmaWx0ZXIwX2ZfNTcyXzMxOSkiPgo8ZWxsaXBzZSBjeD0iNTIuNzM4MSIgY3k9IjY1LjEwMTEiIHJ4PSI4MS4zNzI5IiByeT0iODEuMTkyMyIgZmlsbD0iIzRCNzNGRiIvPgo8L2c+CjxnIGZpbHRlcj0idXJsKCNmaWx0ZXIxX2ZfNTcyXzMxOSkiPgo8ZWxsaXBzZSBjeD0iNjEuNjczNCIgY3k9IjIwLjU0NyIgcng9IjEwNC4yMTYiIHJ5PSI4MS4xOTIzIiBmaWxsPSIjRkY2NkY0Ii8+CjwvZz4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjJfZl81NzJfMzE5KSI+CjxlbGxpcHNlIGN4PSI3OC42NjU5IiBjeT0iNS4yNjgwMiIgcng9IjgxLjM3MjkiIHJ5PSI3MS4zMDQyIiBmaWxsPSIjRkYwMTA1Ii8+CjwvZz4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjNfZl81NzJfMzE5KSI+CjxlbGxpcHNlIGN4PSI2My4xMjEiIGN5PSIyMC41Mjc1IiByeD0iNDguOTM3NCIgcnk9IjQ4LjgyODgiIGZpbGw9IiNGRTdCMDIiLz4KPC9nPgo8L2c+CjxkZWZzPgo8ZmlsdGVyIGlkPSJmaWx0ZXIwX2ZfNTcyXzMxOSIgeD0iLTY1LjAyMTkiIHk9Ii01Mi40Nzg0IiB3aWR0aD0iMjM1LjUyIiBoZWlnaHQ9IjIzNS4xNTkiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4KPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0ic2hhcGUiLz4KPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMTguMTkzNiIgcmVzdWx0PSJlZmZlY3QxX2ZvcmVncm91bmRCbHVyXzU3Ml8zMTkiLz4KPC9maWx0ZXI+CjxmaWx0ZXIgaWQ9ImZpbHRlcjFfZl81NzJfMzE5IiB4PSItNzguOTMwMSIgeT0iLTk3LjAzMjQiIHdpZHRoPSIyODEuMjA4IiBoZWlnaHQ9IjIzNS4xNTkiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4KPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0ic2hhcGUiLz4KPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMTguMTkzNiIgcmVzdWx0PSJlZmZlY3QxX2ZvcmVncm91bmRCbHVyXzU3Ml8zMTkiLz4KPC9maWx0ZXI+CjxmaWx0ZXIgaWQ9ImZpbHRlcjJfZl81NzJfMzE5IiB4PSItMzkuMDk0MiIgeT0iLTEwMi40MjMiIHdpZHRoPSIyMzUuNTIiIGhlaWdodD0iMjE1LjM4MyIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPgo8ZmVGbG9vZCBmbG9vZC1vcGFjaXR5PSIwIiByZXN1bHQ9IkJhY2tncm91bmRJbWFnZUZpeCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJzaGFwZSIvPgo8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIxOC4xOTM2IiByZXN1bHQ9ImVmZmVjdDFfZm9yZWdyb3VuZEJsdXJfNTcyXzMxOSIvPgo8L2ZpbHRlcj4KPGZpbHRlciBpZD0iZmlsdGVyM19mXzU3Ml8zMTkiIHg9Ii0yMi4yMDM2IiB5PSItNjQuNjg4NCIgd2lkdGg9IjE3MC42NDkiIGhlaWdodD0iMTcwLjQzMiIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPgo8ZmVGbG9vZCBmbG9vZC1vcGFjaXR5PSIwIiByZXN1bHQ9IkJhY2tncm91bmRJbWFnZUZpeCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJzaGFwZSIvPgo8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIxOC4xOTM2IiByZXN1bHQ9ImVmZmVjdDFfZm9yZWdyb3VuZEJsdXJfNTcyXzMxOSIvPgo8L2ZpbHRlcj4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzU3Ml8zMTkiIHgxPSI0MC40NTI3IiB5MT0iMjEuNDMzMSIgeDI9Ijc2LjkzMjciIHkyPSIxMjEuOTcxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIG9mZnNldD0iMC4wMjUiIHN0b3AtY29sb3I9IiNGRjhFNjMiLz4KPHN0b3Agb2Zmc2V0PSIwLjU2IiBzdG9wLWNvbG9yPSIjRkY3RUIwIi8+CjxzdG9wIG9mZnNldD0iMC45NSIgc3RvcC1jb2xvcj0iIzRCNzNGRiIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPgo=",
    iconBg: "#FDE8F0",
    iconPad: 4,
    color: "#E05C8A",
  },
  {
    name: "Figma AI",
    by: "Figma",
    use: "Auto-layout, content generation, annotations",
    svgIcon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJMYXllcl8xIiB2aWV3Qm94PSIwIDAgMjAwIDMwMCI+PHN0eWxlPi5zdDB7ZmlsbDojMGFjZjgzfS5zdDF7ZmlsbDojYTI1OWZmfS5zdDJ7ZmlsbDojZjI0ZTFlfS5zdDN7ZmlsbDojZmY3MjYyfS5zdDR7ZmlsbDojMWFiY2ZlfTwvc3R5bGU+PHRpdGxlPkZpZ21hLmxvZ288L3RpdGxlPjxkZXNjPkNyZWF0ZWQgdXNpbmcgRmlnbWE8L2Rlc2M+PHBhdGggaWQ9InBhdGgwX2ZpbGwiIGNsYXNzPSJzdDAiIGQ9Ik01MCAzMDBjMjcuNiAwIDUwLTIyLjQgNTAtNTB2LTUwSDUwYy0yNy42IDAtNTAgMjIuNC01MCA1MHMyMi40IDUwIDUwIDUweiIvPjxwYXRoIGlkPSJwYXRoMV9maWxsIiBjbGFzcz0ic3QxIiBkPSJNMCAxNTBjMC0yNy42IDIyLjQtNTAgNTAtNTBoNTB2MTAwSDUwYy0yNy42IDAtNTAtMjIuNC01MC01MHoiLz48cGF0aCBpZD0icGF0aDFfZmlsbF8xXyIgY2xhc3M9InN0MiIgZD0iTTAgNTBDMCAyMi40IDIyLjQgMCA1MCAwaDUwdjEwMEg1MEMyMi40IDEwMCAwIDc3LjYgMCA1MHoiLz48cGF0aCBpZD0icGF0aDJfZmlsbCIgY2xhc3M9InN0MyIgZD0iTTEwMCAwaDUwYzI3LjYgMCA1MCAyMi40IDUwIDUwcy0yMi40IDUwLTUwIDUwaC01MFYweiIvPjxwYXRoIGlkPSJwYXRoM19maWxsIiBjbGFzcz0ic3Q0IiBkPSJNMjAwIDE1MGMwIDI3LjYtMjIuNCA1MC01MCA1MHMtNTAtMjIuNC01MC01MCAyMi40LTUwIDUwLTUwIDUwIDIyLjQgNTAgNTB6Ii8+PC9zdmc+",
    iconBg: "#F3EEFF",
    iconPad: 6,
    color: "#A259FF",
  },
  {
    name: "Perplexity",
    by: "Perplexity AI",
    use: "Deep research, source-cited synthesis for UX insights",
    svgIcon: "data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjFlbSIgc3R5bGU9ImZsZXg6bm9uZTtsaW5lLWhlaWdodDoxIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIxZW0iIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHRpdGxlPlBlcnBsZXhpdHk8L3RpdGxlPjxwYXRoIGQ9Ik0xOS43ODUgMHY3LjI3MkgyMi41VjE3LjYyaC0yLjkzNVYyNGwtNy4wMzctNi4xOTR2Ni4xNDVoLTEuMDkxdi02LjE1Mkw0LjM5MiAyNHYtNi40NjVIMS41VjcuMTg4aDIuODg0VjBsNy4wNTMgNi40OTRWLjE5aDEuMDl2Ni40OUwxOS43ODYgMHptLTcuMjU3IDkuMDQ0djcuMzE5bDUuOTQ2IDUuMjM0VjE0LjQ0bC01Ljk0Ni01LjM5N3ptLTEuMDk5LS4wOGwtNS45NDYgNS4zOTh2Ny4yMzVsNS45NDYtNS4yMzRWOC45NjV6bTguMTM2IDcuNThoMS44NDRWOC4zNDlIMTMuNDZsNi4xMDUgNS41NHYyLjY1NXptLTguOTgyLTguMjhIMi41OXY4LjE5NWgxLjh2LTIuNTc2bDYuMTkyLTUuNjJ6TTUuNDc1IDIuNDc2djQuNzFoNS4xMTVsLTUuMTE1LTQuNzF6bTEzLjIxOSAwbC01LjExNSA0LjcxaDUuMTE1di00LjcxeiIgZmlsbD0iIzIyQjhDRCIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+PC9zdmc+",
    iconBg: "#E8F9FB",
    iconPad: 6,
    color: "#22B8CD",
  },
  {
    name: "Midjourney",
    by: "Midjourney",
    use: "High-fidelity visual concepts, custom imagery",
    svgIcon: "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMWExYTFhIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGhlaWdodD0iMWVtIiBzdHlsZT0iZmxleDpub25lO2xpbmUtaGVpZ2h0OjEiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjFlbSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+TWlkam91cm5leTwvdGl0bGU+PHBhdGggZD0iTTIyLjM2OSAxNy42NzZjLTEuMzg3IDEuMjU5LTMuMTcgMi4zNzgtNS4zMzIgMy40MTcuMDQ0LjAzLjA4Ni4wNTcuMTMuMDgzbC4wMTguMDEuMDE5LjAxMmMuMjE2LjEyMy40Mi4xODQuNjQxLjE4NC4yMjIgMCAuNDI2LS4wNjEuNjQyLS4xODRsLjAxOC0uMDExLjAxOS0uMDExYy4xNC0uMDg0LjI2Ni0uMTc4LjQ5Mi0uMzY2bC4xNzgtLjE0OGMuMjc5LS4yMzIuNDI2LS4zNDIuNjI1LS40NTYuMzA0LS4xNzQuNjEyLS4yNjYuOTQ5LS4yNjYuMzM3IDAgLjY0NS4wOTIuOTQ5LjI2NmwuMDIzLjAxNGMuMTg4LjEwOS4zMzQuMjE5LjYwMi40NDJsLjE3OC4xNDhjLjIyMS4xODQuMzQ2LjI3OC40ODMuMzZsLjAyOC4wMTcuMDE4LjAxYy4yMS4xMi40MDcuMTgxLjYyLjE4NWguMDIyYS4zMS4zMSAwIDExMCAuNjE4Yy0uMzM3IDAtLjY0NS0uMDkyLS45NS0uMjY2YTMuMTM3IDMuMTM3IDAgMDEtLjA5LS4wNTRsLS4wMjItLjAxNC0uMDIyLS4wMTMtLjAyLS4wMTRhNS4zNTYgNS4zNTYgMCAwMS0uNDktLjM3N2wtLjE1OS0uMTMyYTMuODM2IDMuODM2IDAgMDAtLjQ4My0uMzZsLS4wMjctLjAxNy0uMDE5LS4wMWExLjI1NiAxLjI1NiAwIDAwLS42NDEtLjE4NWMtLjIyMiAwLS40MjYuMDYxLS42NDEuMTg0bC0uMDIuMDExLS4wMTguMDExYy0uMTQuMDg0LS4yNjYuMTc4LS40OTIuMzY2bC0uMTU4LjEzMmE1LjEyNSA1LjEyNSAwIDAxLS41MS4zOWwtLjAyMi4wMTQtLjAyMi4wMTQtLjA5LjA1NGExLjg2OCAxLjg2OCAwIDAxLS45NS4yNjZjLS4zMzcgMC0uNjQ0LS4wOTItLjk0OS0uMjY2YTMuMTM3IDMuMTM3IDAgMDEtLjA5LS4wNTRsLS4wMjItLjAxNC0uMDIyLS4wMTMtLjAyNi0uMDE3YTQuODgxIDQuODgxIDAgMDEtLjQyNS0uMzI1LjMwOC4zMDggMCAwMS0uMTItLjFsLS4wOTgtLjA4MWEzLjgzNiAzLjgzNiAwIDAwLS40ODMtLjM2bC0uMDI3LS4wMTctLjAxOS0uMDFhMS4yNTYgMS4yNTYgMCAwMC0uNjQxLS4xODVjLS4yMjIgMC0uNDI2LjA2MS0uNjQyLjE4NGwtLjAxOC4wMTEtLjAxOS4wMTFjLS4xNC4wODQtLjI2Ni4xNzgtLjQ5Mi4zNjZsLS4xNTguMTMyYTUuMTI1IDUuMTI1IDAgMDEtLjUxLjM5bC0uMDIzLjAxNC0uMDIyLjAxNC0uMDkuMDU0QTEuODY4IDEuODY4IDAgMDExMiAyMmMtLjMzNyAwLS42NDUtLjA5Mi0uOTQ5LS4yNjZhMy4xMzcgMy4xMzcgMCAwMS0uMDktLjA1NGwtLjAyMi0uMDE0LS4wMjItLjAxMy0uMDIxLS4wMTRhNS4zNTYgNS4zNTYgMCAwMS0uNDktLjM3N2wtLjE1OC0uMTMyYTMuODM2IDMuODM2IDAgMDAtLjQ4My0uMzZsLS4wMjgtLjAxNy0uMDE4LS4wMWExLjI1NiAxLjI1NiAwIDAwLS42NDItLjE4NWMtLjIyMSAwLS40MjUuMDYxLS42NDEuMTg0bC0uMDE5LjAxMS0uMDE4LjAxMWMtLjE0MS4wODQtLjI2Ni4xNzgtLjQ5Mi4zNjZsLS4xNTguMTMyYTUuMTI1IDUuMTI1IDAgMDEtLjUxMS4zOWwtLjAyMi4wMTQtLjAyMi4wMTQtLjA5LjA1NGExLjg2OCAxLjg2OCAwIDAxLS45ODYuMjY0Yy0uNzQ2LS4wOS0xLjMxOS0uMzgtMS44OS0uODY2bC0uMDM1LS4wM2MtLjA0Ny0uMDQxLS4xMTgtLjEwNi0uMTkyLS4xNzRsLS4xOTYtLjE4MS0uMTA3LS4xLS4wMTEtLjAxYTEuNTMxIDEuNTMxIDAgMDAtLjMzNi0uMjUzLjMxMy4zMTMgMCAwMC0uMDk1LS4wM2gtLjAwNWMtLjExOS4wMjItLjIzOC4wNTktLjM2MS4xMWEuMzA4LjMwOCAwIDAxLS4wNzcuMDYxbC0uMDA4LjAwNWEuMzA5LjMwOSAwIDAxLS4xMjYuMDM0IDUuNjYgNS42NiAwIDAwLS43NzQuNTE4bC0uNDE2LjMyNC0uMDU1LjA0M2E2LjU0MiA2LjU0MiAwIDAxLS4zMjQuMjM2Yy0uMzA1LjIwNy0uNTUyLjMxNS0uOC4zMTVhLjMxLjMxIDAgMDEtLjAxLS42MThoLjAxYy4wOSAwIC4yMzUtLjA2Mi40MzgtLjE5OGwuMDQtLjAyN2MuMDc3LS4wNTQuMTYzLS4xMTcuMjctLjE5OWwuMzg1LS4zMDEuMDYtLjA0N2MuMjY4LS4yMDYuNTA2LS4zNzMuNzMtLjUwNWwtLjYzMy0xLjIxYS4zMDkuMzA5IDAgMDEuMjU0LS40NTFsMjAuMjg3LTEuMzA1YS4zMDkuMzA5IDAgMDEuMjI4LjUzN3ptLTEuMTE4LjE0TDIuMzY5IDE5LjAzbC40MjMuODA5Yy4xMjgtLjA0NS4yNTYtLjA3OC4zODgtLjFhLjMxLjMxIDAgMDEuMDUyLS4wMDVjLjEzMiAwIC4yNi4wMzIuMzg2LjA5My4xNTMuMDczLjI5NC4xNzkuNDgzLjM1bC4wMTYuMDE1LjA5Mi4wODYuMTQ0LjEzNC4wOTcuMDg5Yy4wNjUuMDYuMTI1LjExNC4xNi4xNDQuNDg1LjQxOC45NDguNjU4IDEuNTU0LjczNmguMDExYTEuMjUgMS4yNSAwIDAwLjYtLjE3MmwuMDIxLS4wMTEuMDE5LS4wMTEuMDE4LS4wMTFjLjE0MS0uMDg0LjI2Ni0uMTc4LjQ5Mi0uMzY2bC4xNzgtLjE0OGMuMjc5LS4yMzIuNDI2LS4zNDIuNjI1LS40NTYuMzA1LS4xNzQuNjEyLS4yNjYuOTUtLjI2Ni4zMzYgMCAuNjQ0LjA5Mi45NDguMjY2bC4wMjMuMDE0Yy4xODguMTA5LjMzNS4yMTkuNjAzLjQ0MmwuMTc3LjE0OGMuMjIyLjE4NC4zNDYuMjc4LjQ4NC4zNmwuMDI3LjAxNy4wMTkuMDFjLjIxNS4xMjQuNDIuMTg1LjY0MS4xODUuMjIyIDAgLjQyNi0uMDYxLjY0MS0uMTg0bC4wMTktLjAxMS4wMTgtLjAxMWMuMTQxLS4wODQuMjY3LS4xNzguNDkzLS4zNjZsLjE3Ny0uMTQ4Yy4yOC0uMjMyLjQyNy0uMzQyLjYyNi0uNDU2LjMwNC0uMTc0LjYxMi0uMjY2Ljk0OS0uMjY2LjMzNyAwIC42NDQuMDkyLjk0OS4yNjZsLjAyNS4wMTVjLjE4Ny4xMDkuMzM0LjIyLjYwMy40NDMgMS44NjctLjg3OCAzLjQ0OC0xLjgxMSA0LjczLTIuODMybC4wMi0uMDE2ek0zLjY1MyAyLjAyNkM2LjA3MyAzLjA2IDguNjkgNC45NDEgMTAuOCA3LjI1OGMyLjQ2IDIuNyA0LjEwOSA1LjgyOCA0LjYzNyA5LjE0OWEuMzEuMzEgMCAwMS0uNDIxLjMzNWMtMi4zNDgtLjk0NS00LjU0LTEuMjU4LTYuNTktMS4wMi0xLjczOS4yLTMuMzM3Ljc5Mi00LjgxNiAxLjcwMy0uMjk0LjE4Mi0uNjItLjE4Mi0uNDA1LS40NTQgMS44NTYtMi4zNTUgMi41ODEtNC45OSAyLjM0My03Ljc5NC0uMTk1LTIuMjkyLTEuMDMxLTQuNjEtMi4yODQtNi43MDlhLjMxLjMxIDAgMDEuMzg4LS40NDJ6TTEwLjA0IDQuNDVjMS43NzguNTQzIDMuODkyIDIuMTAyIDUuNzgyIDQuMjQzIDEuOTg0IDIuMjQ4IDMuNTUyIDQuOTM0IDQuMzQ3IDcuNTgyYS4zMS4zMSAwIDAxLS40MDEuMzhsLS4wMjItLjAxLS4zODYtLjE1NGExMC41OTQgMTAuNTk0IDAgMDAtLjI5MS0uMTEybC0uMDE2LS4wMDZjLS42OC0uMjQ3LTEuMTk5LS4yOTEtMS45NDQtLjEwMWEuMzEuMzEgMCAwMS0uMzc1LS4yMThDMTUuMzc4IDExLjEyMyAxMy4wNzMgNy4yNzYgOS43NzUgNWMtLjI5MS0uMjAxLS4wNzItLjY1My4yNjYtLjU1ek00LjI3MyAyLjk5NmwuMDA4LjAxNWMxLjAyOCAxLjk0IDEuNzA4IDQuMDMxIDEuODg1IDYuMTEzLjIxMyAyLjUxMy0uMzEgNC45MDYtMS42NzMgNy4wOTJsLS4wMi4wMzEuMDAzLS4wMDFjMS4xOTgtLjU4MSAyLjQ3LS45NjkgMy44MjUtMS4xMzJsLjA1NS0uMDA2YzEuOTgxLS4yMyA0LjA4My4wMjkgNi4zMDkuODM3bC4wNjYuMDI1LS4wMDctLjAzOWMtLjU5My0yLjk1LTIuMTA4LTUuNzM3LTQuMzEtOC4xNzlsLS4wNy0uMDc4Yy0xLjc4NS0xLjk2LTMuOTQ0LTMuNi02LjAxNC00LjY1bC0uMDU3LS4wMjh6bTcuOTIgMy4yMzhsLjA0OC4wNDhjMi4yMzcgMi4yOTUgMy44ODUgNS40MzEgNC45NzQgOS4xOTFsLjAzOC4xMzIuMDIyLS4wMDRjLjcxLS4xMzMgMS4yODQtLjA2MyAxLjk2My4xOGwuMDI3LjAxLjA2Ni4wMjQuMDQ2LjAxOC0uMDI1LS4wNzNjLS44MTEtMi4zMDctMi4yMDgtNC42Mi0zLjkzNi02LjU5NGwtLjA1OC0uMDY1Yy0xLjAyLTEuMTU1LTIuMTAzLTIuMTMyLTMuMTUtMi44NTZsLS4wMTUtLjAxMXoiPjwvcGF0aD48L3N2Zz4=",
    iconBg: "#F0F0F0",
    iconPad: 5,
    color: "#1a1a1a",
  },
  {
    name: "ChatGPT",
    by: "OpenAI",
    use: "User research, ideation, content creation, prototyping",
    svgIcon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMjQwNiAyNDA2Ij4KCTxwYXRoIGQ9Ik0xIDU3OC40QzEgMjU5LjUgMjU5LjUgMSA1NzguNCAxaDEyNDkuMWMzMTkgMCA1NzcuNSAyNTguNSA1NzcuNSA1NzcuNFYyNDA2SDU3OC40QzI1OS41IDI0MDYgMSAyMTQ3LjUgMSAxODI4LjZWNTc4LjR6IiBmaWxsPSIjNzRhYTljIi8+Cgk8cGF0aCBpZD0iYSIgZD0iTTExMDcuMyAyOTkuMWMtMTk3Ljk5OSAwLTM3My45IDEyNy4zLTQzNS4yIDMxNS4zTDY1MCA3NDMuNXY0MjcuOWMwIDIxLjQgMTEgNDAuNCAyOS40IDUxLjRsMzQ0LjUgMTk4LjUxNVY4MzMuM2guMXYtMjcuOUwxMzcyLjcgNjA0YzMzLjcxNS0xOS41MiA3MC40NC0zMi44NTcgMTA4LjQ3LTM5LjgyOEwxNDQ3LjYgNDUwLjNDMTM2MSAzNTMuNSAxMjM3LjEgMjk4LjUgMTEwNy4zIDI5OS4xem0wIDExNy41LS42LjZjNzkuNjk5IDAgMTU2LjMgMjcuNSAyMTcuNiA3OC40LTIuNSAxLjItNy40IDQuMy0xMSA2LjFMOTUyLjggNzA5LjNjLTE4LjQgMTAuNC0yOS40IDMwLTI5LjQgNTEuNFYxMjQ4bC0xNTUuMS04OS40Vjc1NS44Yy0uMS0xODcuMDk5IDE1MS42MDEtMzM4LjkgMzM5LTMzOS4yeiIgZmlsbD0iI2ZmZiIvPgoJPHVzZSB4bGluazpocmVmPSIjYSIgdHJhbnNmb3JtPSJyb3RhdGUoNjAgMTIwMyAxMjAzKSIvPgogIAk8dXNlIHhsaW5rOmhyZWY9IiNhIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjAgMTIwMyAxMjAzKSIvPgoJPHVzZSB4bGluazpocmVmPSIjYSIgdHJhbnNmb3JtPSJyb3RhdGUoMTgwIDEyMDMgMTIwMykiLz4KCTx1c2UgeGxpbms6aHJlZj0iI2EiIHRyYW5zZm9ybT0icm90YXRlKDI0MCAxMjAzIDEyMDMpIi8+Cgk8dXNlIHhsaW5rOmhyZWY9IiNhIiB0cmFuc2Zvcm09InJvdGF0ZSgzMDAgMTIwMyAxMjAzKSIvPgoKPC9zdmc+",
    iconBg: "transparent",
    iconPad: 0,
    color: "#74aa9c",
  },
];

const ABOUT_PARAGRAPHS = [
  "I have a deep curiosity about what motivates people. Over 10+ years I've designed across healthcare SaaS, energy, luxury tech, recruitment, and consumer retail, bringing the same rigour and care to each. My guiding principle has always been 'what can we take away?' rather than 'what can we add?' Simple, intuitive solutions are what I'm after, always.",
  "I believe the most important thing an AI-informed designer can bring is sound judgement \u2014 knowing which problem is worth solving, and why. My work is rooted in deep product knowledge: understanding the business, the users, and the system before reaching for a solution. I use AI to accelerate the right parts of my process, but judgement, empathy, and the instinct about what will actually resonate only come from experience. They stay with me.",
];

const SKILLS = [
  { label: "UX Research", color: "#2563EB" },
  { label: "Interaction Design", color: "#7C3AED" },
  { label: "Design Systems", color: "#0891B2" },
  { label: "Prototyping", color: "#059669" },
  { label: "Product Strategy", color: "#DC2626" },
  { label: "AI-Informed Workflows", color: "#ff3e3e" },
  { label: "Leadership", color: "#2563EB" },
  { label: "User Testing", color: "#7C3AED" },
  { label: "Figma", color: "#2563EB" },
  { label: "Healthcare Tech", color: "#0891B2" },
  { label: "Accessibility", color: "#059669" },
  { label: "HTML & CSS", color: "#ff3e3e" },
  { label: "Google Analytics", color: "#DC2626" },
  { label: "Hotjar", color: "#7C3AED" },
  { label: "Storybook", color: "#E05C8A" },
  { label: "Balsamiq", color: "#2563EB" },
  { label: "Adobe Creative Suite", color: "#DC2626" },
  { label: "Stakeholder Management", color: "#0891B2" },
  { label: "Mentoring", color: "#059669" },
];

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(26px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const CAREER_ERAS = [
  {
    era: "UX Leadership",
    range: "2021 – Present",
    summary: "ChilliPharm · Pharma SaaS · London",
    accentColor: "#2563EB",
    defaultOpen: true,
    jobs: [
      {
        role: "Lead UX/UI Designer",
        company: "ChilliPharm",
        type: "Pharma SaaS",
        period: "Feb 2023 – Present",
        location: "London, UK",
        color: "#2563EB",
        highlights: [
          "Promoted to Lead after building UX practice from scratch — first dedicated design hire",
          "Delivered <strong>81% reduction</strong> in data entry time through platform redesign, measured via Fullstory",
          "Drove WCAG 2.1 AA accessibility compliance across the platform",
          "Mentored a junior designer from zero UX experience to contributing team member",
        ],
      },
      {
        role: "Senior UX/UI Designer",
        company: "ChilliPharm",
        type: "Pharma SaaS",
        period: "Feb 2021 – Feb 2023",
        location: "London, UK",
        color: "#2563EB",
        highlights: [
          "Built the company-wide design system and Storybook component library",
          "Built live Google Analytics dashboards for all stakeholders",
          "Mapped and redesigned entire SDLC to embed design throughout",
        ],
      },
    ],
  },
  {
    era: "Building in Australia",
    range: "2018 – 2020",
    summary: "Momentum Energy · Just Group · Blackmagic · Melbourne",
    accentColor: "#7C3AED",
    defaultOpen: false,
    jobs: [
      {
        role: "UX/UI Designer",
        company: "Momentum Energy",
        type: "Energy Retailer",
        period: "Jan 2019 – Dec 2020",
        location: "Melbourne, AU",
        color: "#7C3AED",
        highlights: [
          "First internal UX hire — built the function from the ground up",
          "Co-led new website launch (key driver of business growth)",
          "Co-led customer journey mapping programme with CX team and senior leadership",
        ],
      },
      {
        role: "Digital/UI Designer",
        company: "Just Group",
        type: "Fashion Retailer",
        period: "Sep – Dec 2018",
        location: "Melbourne, AU",
        color: "#0891B2",
        highlights: [
          "EDM design, coding & delivery across multiple fashion brands",
          "Context-switching across individual brand guidelines at pace",
        ],
      },
      {
        role: "Digital/UI Designer",
        company: "Blackmagic Design",
        type: "Tech & Software",
        period: "Aug – Sep 2018",
        location: "Melbourne, AU",
        color: "#0891B2",
        highlights: [
          "Responsive UI design for website in Sketch",
          "Fast-paced delivery within a refined, established design system",
        ],
      },
    ],
  },
  {
    era: "Finding My Craft",
    range: "2013 – 2018",
    summary: "Xref · IPH · Vertu · Sydney & UK",
    accentColor: "#059669",
    defaultOpen: false,
    jobs: [
      {
        role: "Digital Designer",
        company: "Xref",
        type: "Recruitment SaaS",
        period: "Sep 2016 – Aug 2018",
        location: "Sydney, AU",
        color: "#059669",
        highlights: [
          "Managed global brand design at high-growth startup (3× growth)",
          "Led full rebrand rollout with external agency and founders",
          "Website, events, print, digital and some front-end code",
        ],
      },
      {
        role: "Graphic (Web) Designer",
        company: "IPH Limited",
        type: "Law Firm",
        period: "Oct 2015 – Sep 2016",
        location: "Sydney, AU",
        color: "#ff3e3e",
        highlights: [
          "Sole designer for IPH and Spruson & Ferguson brands",
          "Annual reports, presentations, newsletters, intranet coding",
        ],
      },
      {
        role: "UX/UI Designer (Android)",
        company: "Vertu",
        type: "Luxury Mobile Phones",
        period: "Apr 2014 – Jul 2015",
        location: "Church Crookham, UK",
        color: "#7C3AED",
        highlights: [
          "UI & UX for Android OS across the KitKat → Lollipop transition",
          "Co-wrote the style guide from scratch; produced Visio design specifications for developers",
          "Designed clock face and wallpaper collection for the Elena handset",
          "User flows, icon design, graphical assets across six app areas",
        ],
      },
    ],
  },
  {
    era: "Where It Started",
    range: "2010 – 2014",
    summary: "GAME Retail · Basingstoke, UK",
    accentColor: "#ff3e3e",
    defaultOpen: false,
    jobs: [
      {
        role: "Web Designer",
        company: "GAME",
        type: "Games Retailer",
        period: "Jun 2013 – Apr 2014",
        location: "Basingstoke, UK",
        color: "#ff3e3e",
        highlights: [
          "Self-taught HTML & CSS to transition from print into web",
          "Banners, feature pages, home page e-spots and logo design",
        ],
      },
      {
        role: "Graphic Designer",
        company: "GAME",
        type: "Games Retailer",
        period: "Dec 2010 – Jun 2013",
        location: "Basingstoke, UK",
        color: "#ff3e3e",
        highlights: [
          "POS design for all UK stores — high-volume, fast-paced environment",
          "Campaigns, press ads, posters and large-format graphics",
        ],
      },
    ],
  },
];

const CASE_STUDIES = [
  {
    id: 1,
    title: "Clinical Trial Platform Redesign",
    company: "ChilliPharm",
    tags: ["UX Research", "Design Systems", "Healthcare"],
    tagColors: ["#2563EB", "#7C3AED", "#0891B2"],
    accent: "#2563EB",
    thumbBg: "linear-gradient(135deg, #2563EB22, #7C3AED22)",
    thumbIcon: "⬡",
    heroImage: "chillipharm",
    role: "Lead UX/UI Designer",
    year: "2023–2024",
    summary: "ChilliPharm is a London-based Pharma SaaS company providing clinical trial platforms to pharmaceutical clients and research sites worldwide. The platform had grown organically over several years, leaving behind a fragmented data architecture, inconsistent UI, and a product that was increasingly complex to use. As the company's first dedicated UX design hire, I led a ground-up redesign of the platform, building the design system from scratch, embedding design into the development lifecycle from day one, and mentoring a junior designer through the process.",
    cardSummary: "ChilliPharm is a London-based Pharma SaaS company providing clinical trial platforms to pharmaceutical clients and research sites worldwide. The platform had grown organically over several years — leaving behind a fragmented data architecture, inconsistent UI, and a product that was increasingly complex to use.",
    challenge: {
      text: "ChilliPharm's platform gave clients total freedom over how they organised clinical trial assets, but that freedom came at a cost. Folder structures were inconsistent, file naming was ad hoc, and critical metadata fields like patient numbers and visit dates were free text, leaving them vulnerable to human error. This metadata also had to be re-entered manually for every upload, even when multiple files shared the same assessment details. The result: a system that couldn't report on its own data, couldn't integrate with external platforms, and was increasingly complex to use. A new companion app was in the works, but it quickly became clear it couldn't function without a consistent underlying data structure to speak to. The platform needed a ground-up rethink — data architecture, information hierarchy, and a UI that had fallen well behind modern standards.",
      images: [
        { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/chilli_lib_1.webp", caption: "All content with folder structure to the left" },
        { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/chilli_lib_2.webp", caption: "Media viewing page" },
        { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/chilli_lib_3.webp", caption: "Uploading assets with data fields" },
        { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/chilli_lib_4.webp", caption: "Desktop only — not mobile friendly" },
      ],
    },
    approach: [
      {
        number: "01",
        stage: "Understand",
        color: "#2563EB",
        content: "Before touching any designs, I invested heavily in understanding the problem space. That meant speaking with internal stakeholders and client-facing teams, interviewing clients directly, and researching the clinical trial domain itself, including the Protocol documents that define how trials are structured. I also audited competitor platforms to identify design patterns worth adopting.",
        images: [],
      },
      {
        number: "02",
        stage: "Simplify",
        color: "#7C3AED",
        content: "I ran collaborative sketch sessions with key stakeholders and subject matter experts, pencil and paper, getting ideas out fast before committing to anything. These sessions helped surface the core structural decisions around data architecture and information hierarchy, and built shared ownership of the direction early.",
        images: [
          { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/chilli_sketch_1.webp", caption: "" },
          { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/chilli_sketch_2.webp", caption: "" },
          { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/chilli_sketch_3.webp", caption: "" },
          { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/chilli_sketch_4.webp", caption: "" },
        ],
      },
      {
        number: "03",
        stage: "Refine",
        color: "#ff3e3e",
        content: "Sketches fed into wireframes, then progressively higher-fidelity designs in Figma, culminating in a clickable prototype we tested with clients and internal client managers. That feedback drove a significant iteration cycle before handing refined specs to the development team, who built a live prototype for further testing ahead of an MVP release to a select group of clients.",
        images: [
          { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/chilli_balsamiq_1.webp", caption: "Balsamiq Wireframe" },
          { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/chilli_balsamiq_2.webp", caption: "Balsamiq Wireframe" },
          { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/chilli_wire_1.webp", caption: "Study builder lo-fi UI" },
          { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/chilli_wire_3.webp", caption: "Assessment page lo-fi UI" },
          { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/chilli_wall.webp", caption: "Information architecture planning" },
        ],
      },
      {
        number: "04",
        stage: "Measure",
        color: "#059669",
        content: "The live dev prototype went through further rounds of testing before an MVP was released to a select group of clients. Midway through the project, the Director of Product took extended leave, and I stepped up to lead the release alongside a senior stakeholder, holding the design vision through to delivery. It was one of the most stretching experiences of my career, and one I received strong feedback on.",
        images: [],
      },
    ],
    outcome: {
      summary: "Client and internal feedback has been consistently positive since launch. Clinical evaluators found the new structure significantly faster and less error-prone, and account managers training clients noted how intuitive it feels in practice, with less need for explanation. Sponsors responded well to the increased consistency in how data was structured. The MVP has been iterated on continuously since release. Reporting and the companion app (the original catalyst for the project) are both now in active development, made possible by the consistent data structure the redesign put in place. The foundation is built; the full vision is being realised.",
      images: [
        { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/chilli_sites_1.webp", caption: "Subject list page" },
        { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/chilli_sites_2.webp", caption: "Assessment data entry" },
        { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/chilli_sites_3.webp", caption: "Assessment page" },
        { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/chilli_sites_4.webp", caption: "Mobile responsiveness with dev notes" },
      ],
      stat: {
        value: "81%",
        label: "reduction in data entry time per assessment",
        methodology: {
          headline: "How this number was calculated",
          body: "Data entry times were measured from 10 Fullstory session recordings on each platform, matched for sample size (33 assets total in each set). The timer started when the user clicked the upload button and stopped when the upload was submitted — upload transfer time was excluded, as this is network-dependent and unaffected by the redesign. Sessions with unusually large file sizes or clear connectivity issues were excluded as outliers.",
          stats: [
            { label: "Old platform avg", value: "3m 29s" },
            { label: "New platform avg", value: "40s" },
            { label: "Per asset (old)", value: "1m 36s" },
            { label: "Per asset (new)", value: "16s" },
            { label: "Sessions analysed", value: "10 each" },
            { label: "Total assets", value: "33 each" },
          ],
        },
      },
      quotes: [
        { text: "The data entry with Sites now is so so much faster, and the sponsors really love the way the data is structured, meaning there is more consistency and fewer errors.", attribution: "Account Manager, ChilliPharm" },
        { text: "Clients really like the look and feel — when I'm on a training call and I'm explaining something, I'm thinking this is really obvious, because it is just so intuitive.", attribution: "Account Manager, ChilliPharm" },
        { text: "I think that this solves a chunk of our problems. At face value I think that this will really simplify things for us.", attribution: "Client" },
        { text: "If anyone hadn\'t seen the new ChilliPharm enhancements, well they\'re kind of amazing.", attribution: "Client" },
      ],
    },
    images: [],
  },
  {
    id: 2,
    title: "Service Design & Experience Mapping",
    company: "ChilliPharm",
    tags: ["Service Design", "Strategy", "Workshops"],
    tagColors: ["#ff3e3e", "#7C3AED", "#0891B2"],
    accent: "#ff3e3e",
    thumbBg: "linear-gradient(135deg, #ff3e3e22, #7C3AED22)",
    thumbIcon: "◎",
    heroImage: "strategy",
    role: "Lead UX/UI Designer",
    year: "2024–2025",
    summary: "ChilliPharm’s platform had been built incrementally over several years — features added in response to immediate needs, without a shared view of the whole. Before a ground-up product overhaul could begin, we needed to understand the full service: every user, every workflow, every pain point, from the moment a client is onboarded to the moment a trial closes. Working closely with colleagues across the business, I contributed to a series of internal workshops and stakeholder interviews, helping to map the entire clinical trial lifecycle and produce a suite of strategic UX artefacts that became the foundation for the product overhaul currently underway.",
    cardSummary: "Before a ground-up product overhaul could begin, we needed to understand the full service. Working closely with colleagues, I contributed to workshops and stakeholder interviews that mapped the entire clinical trial lifecycle — every user, every workflow, every pain point — from onboarding to trial completion.",
    challenge: {
      text: "ChilliPharm serves a complex ecosystem of users — clinical evaluators filming assessments, QC reviewers checking footage, sponsors monitoring trial progress, compliance teams auditing activity, and internal video services handling redaction and editing. Each group had a different relationship with the platform, and each team within ChilliPharm had a siloed understanding of how their piece of the product worked. As the product prepared for its most significant overhaul to date, that gap needed closing — not just for design’s benefit, but across the entire business.",
      images: [
        { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/strategy_workflows.webp", caption: "User workflows — Clinical Evaluator, QC Reviewer, Video Services" },
      ],
    },
    approach: [
      {
        number: "01",
        stage: "Understand",
        color: "#2563EB",
        content: "Working alongside colleagues, we facilitated workshops and one-to-one interviews with stakeholders from across the business — Account Management, Video Services, Compliance, and Product — as well as gathering insight from external users including clinical evaluators and reviewers. For each user segment we worked through Value Proposition Canvases, mapping gains, pains, and jobs to be done. This gave us a structured way to surface what each group actually needed from the platform, rather than what we assumed they needed.",
        images: [
          { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/strategy_vp_inflight.webp", caption: "" },
          { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/strategy_vp_setup.webp", caption: "" },
        ],
      },
      {
        number: "02",
        stage: "Simplify",
        color: "#7C3AED",
        content: "The interview and workshop findings were synthesised into a set of detailed user personas and pen portraits covering all user types — both the external users interacting with the platform directly and the internal teams whose work depends on it. Having these as tangible, visual artefacts gave the whole business a shared language for talking about users for the first time.",
        images: [
          { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/strategy_personas.webp", caption: "" },
          { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/strategy_pen_portraits.webp", caption: "" },
        ],
      },
      {
        number: "03",
        stage: "Refine",
        color: "#ff3e3e",
        content: "The personas and value propositions fed into a suite of strategic outputs: a full product customer experience map spanning the trial lifecycle from Set Up through Inflight to Completion, user workflow diagrams for each key role, a product site map with UX debt annotated, and an SDLC process map aligning design phases with development. These artefacts were printed and pinned to a visible wall in the office — and something unexpected happened. Colleagues from across the business stopped to look, asked questions, and engaged with the work in a way that rarely happens with a Figma file. That visibility created real cross-functional buy-in.",
        images: [
          { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/strategy_sitemap.webp", caption: "" },
          { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/strategy_sdlc.webp", caption: "" },
        ],
      },
      {
        number: "04",
        stage: "Measure",
        color: "#059669",
        content: "The outputs are now the strategic reference point for the product overhaul currently underway — informing prioritisation decisions, shaping the product roadmap, and giving design, product, and development a shared foundation to build from. The process also surfaced opportunities that hadn’t been on the radar, particularly for internal users like Video Services and Compliance whose workflows had rarely been examined from a UX perspective.",
        images: [],
      },
    ],
    outcome: {
      summary: "Beyond the artefacts themselves, the most rewarding part of this project was seeing what happens when you make invisible complexity visible. People who had never thought of themselves as stakeholders in a UX process became engaged, curious, and — crucially — aligned. That alignment is what makes a product overhaul possible.",
      images: [
        { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/strategy_hero.webp", caption: "Workshop wall — service mapping in progress" },
        { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/strategy_cx_map.webp", caption: "Product customer experience map — Set Up to Completion" },
      ],
      quotes: [
        { text: "This is the type of information we need to better identify our priorities and where we can bring the most value and cut frustration.", attribution: "Lead Developer, ChilliPharm" },
        // { text: "[Quote placeholder — stakeholder on the value of the workshops]", attribution: "[Name], [Role], ChilliPharm" },
      ],
    },
    images: [],
  },
  {
    id: 3,
    title: "Energy Retail Website Launch",
    company: "Momentum Energy",
    tags: ["UX Design", "Conversion", "Design System"],
    tagColors: ["#7C3AED", "#2563EB", "#0891B2"],
    accent: "#7C3AED",
    thumbBg: "linear-gradient(135deg, #7C3AED22, #0891B222)",
    thumbIcon: "◆",
    heroImage: "momentum",
    role: "UX/UI Designer",
    year: "2019–2020",
    summary: "Momentum Energy is an Australian energy retailer selling electricity, gas and solar plans to residential and business customers. The brief started as a focused conversion problem — gas sign-ups were lagging behind electricity because the tab-based plan selector made it too easy for users to overlook gas entirely. Solving that problem revealed a broader need, and led to a full website redesign in collaboration with Melbourne UX agency MASS. I worked in residency at MASS for the duration of the project, contributing to user testing, sketching, high-fidelity design, and rationalising the type system across the new site.",
    cardSummary: "Momentum Energy is an Australian energy retailer selling electricity, gas and solar plans to residential and business customers. What started as a focused conversion problem — gas sign-ups lagging behind electricity — led to a full website redesign in collaboration with Melbourne UX agency MASS in Melbourne.",
    challenge: {
      text: "The Momentum Energy website allowed users to compare electricity and gas plans through a tab-based selector, but the default tab was always electricity, meaning gas was hidden one click away. For users who didn’t think to switch tabs, gas plans were effectively invisible. The result was a measurable gap in gas sign-ups relative to electricity, despite gas being a core part of the product offering. The tab design also created a secondary problem: users who wanted both electricity and gas — dual fuel — had to navigate between tabs to select them, with no clear visual indication that this was even possible. The interface wasn’t reflecting the reality of what Momentum offered. A targeted fix was needed first; but as the problem was explored, it became clear that the plan selector was only one symptom of a broader UX debt across the site — one that would eventually require a ground-up redesign.",
      images: [
        { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/momentum_original.webp", caption: "The original tab-based plan selector" },
        { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/momentum_mockup.webp", caption: "First proposed fix — highlighting the gas tab and cart button" },
      ],
    },
    approach: [
      {
        number: "01",
        stage: "Understand",
        color: "#2563EB",
        content: "I audited the existing plan selector, mapped the user flow through the sales funnel, and identified where drop-off was occurring. Research into how users conceptualise energy products informed early decisions — notably that solar isn’t typically grouped with electricity in users’ minds, which influenced how the plan types were presented.",
        images: [],
      },
      {
        number: "02",
        stage: "Simplify",
        color: "#7C3AED",
        content: "I explored several structural directions through sketching before committing to anything. An initial idea of separate pages for electricity and gas was quickly ruled out — navigating users away from the plan view risked losing them entirely. I also explored consolidating secondary options like daily usage and e-bill upload into a collapsible section, both to save screen real estate and to surface the plan tiles higher on the page, particularly on mobile where they were falling below the fold entirely.",
        images: [
          { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/momentum_sketch_1.webp", caption: "Sketch 1 — separate pages option" },
          { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/momentum_sketch_2.webp", caption: "Sketch 2 — plan tile improvements" },
          { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/momentum_sketch_3.webp", caption: "Sketch 3 — consolidating the e-bill option" },
          { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/momentum_sketch_4.webp", caption: "Sketch 4 — solar separation consideration" },
        ],
      },
      {
        number: "03",
        stage: "Refine",
        color: "#ff3e3e",
        content: "My proposed solution replaced the tab system with toggle-style radio buttons, making electricity and gas simultaneously visible and independently selectable. I also identified improvements to the plan tiles — bonus information was duplicated and inconsistently labelled, and the fees dropdown read as a warning when it was actually a benefit. I produced a mockup of an interim fix alongside the fuller redesign concept, with a recommendation for split testing to isolate the cause of the drop-off. This work fed into the wider redesign in collaboration with MASS, where I participated in user testing sessions, contributed to sketching and high-fidelity design, and led the rationalisation of the type scale — condensing a fragmented hierarchy of similar sizes into a coherent, lean system.",
        images: [
          { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/momentum_refine_1.webp", caption: "Sketch 5 — mobile consolidation" },
          { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/momentum_refine_2.webp", caption: "Sketch 6 — expandable section functionality" },
          { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/momentum_main_solution.webp", caption: "Main solution — toggle-style plan selector" },
        ],
      },
      {
        number: "04",
        stage: "Measure",
        color: "#059669",
        content: "The redesigned site was validated through AB testing and user feedback sessions before launch, run in-house by the Momentum team. On the type system specifically, the goal was a measurable reduction in the number of distinct sizes in use — fewer decisions for the developer, more consistency for the user.",
        images: [],
      },
    ],
    outcome: {
      summary: "The redesigned website launched and became central to the business’s growth over the following two years. Working in residency at MASS was formative — the experience of collaborative user testing, structured feedback sessions, and high-fidelity design at agency pace shaped how I approach UX work to this day. The project also reinforced something I’ve carried forward: that the most impactful design decisions are often the smallest ones. Replacing a tab with a toggle, surfacing a hidden option, removing a confusing label — these are the changes that move conversion metrics.",
      images: [
        { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/momentum_hero_1.webp", caption: "Redesigned website — mobile and desktop" },
        { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/momentum_hero_2.webp", caption: "Redesigned energy plans page" },
      ],
      quotes: [],
    },
    images: [],
  },
  {
    id: 4,
    title: "Android UI Redesign",
    company: "Vertu",
    tags: ["UI Design", "Android", "Style Guide"],
    tagColors: ["#0891B2", "#2563EB", "#7C3AED"],
    accent: "#0891B2",
    thumbBg: "linear-gradient(135deg, #0891B222, #2563EB22)",
    thumbIcon: "◈",
    heroImage: "vertu",
    role: "UX/UI Designer",
    year: "2014–2015",
    summary: "Vertu makes handcrafted luxury Android phones — titanium frames, sapphire crystal screens, hand-stitched leather; built for an audience that expected the software to match the quality of the hardware. When Android moved from KitKat to Lollipop, introducing Material Design and the shift from skeuomorphism to flat UI, every screen needed rethinking. Working in a small design team, I contributed to redesigning the UI across multiple app areas, wrote the style guide from scratch, and produced detailed design specifications for the development team.",
    cardSummary: "Vertu makes handcrafted luxury Android phones — titanium frames, sapphire crystal screens, hand-stitched leather — built for users who expected the software to match the hardware. When Android moved from KitKat to Lollipop, introducing Material Design and the shift from skeuomorphism to flat UI, every screen needed rethinking.",
    challenge: {
      text: "Vertu's existing UI had been built on KitKat — skeuomorphic, gradient-heavy, and visually busy. Glossy buttons, realistic textures and dividing lines everywhere made it feel dated and inconsistent. For a brand where the hardware was hand-stitched and built from luxury materials, the software wasn't keeping up. The challenge was threefold: adopt Material Design principles without losing the brand's premium character; ensure consistency across a complex suite of apps (Vertu Life, Vertu Care, Concierge, Camera, Dolby Audio, volume control); and produce specifications precise enough for developers to build from — all while learning the craft of UX design in my first dedicated role.",
      images: [
        { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/vertu_comp_1.webp", caption: "Vertu Care — KitKat vs Lollipop", annotations: ["I pushed through a new highlight colour to steer the UI away from KitKat associations.", "In my design, the FAB button would expand on tap to reveal the options for contact, condensing and simplifying the interface."] },
        { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/vertu_comp_2.webp", caption: "Navigation menu — KitKat vs Lollipop", annotations: ["Once the side menu icon is tapped it will change into an icon mirroring the back navigation button.", "I redesigned the icons to be more simple, solid and consistent, and work better as a block element.", "Colours of UI in line with the newly written style guide — here they give a clearer definition between the content and the menu bar.", "A more defined hierarchy between the UI elements. Title bar stays on top, next is the menu bar and least importantly the original content, dimmed. The page content stays locked in its position rather than shifting with the menu."] },
      ],
    },
    approach: [
      {
        number: "01",
        stage: "Understand",
        color: "#2563EB",
        content: "I immersed myself in the Vertu brand, the Material Design guidelines Google had introduced with Lollipop, and the existing KitKat UI to understand what needed to change and why. As my first UX role, this stage was as much about learning the discipline as it was about the product.",
        images: [],
      },
      {
        number: "02",
        stage: "Simplify",
        color: "#7C3AED",
        content: "The core design decision was subtraction and simplification. Gradients out, dividing lines removed where users already understood the affordance. Icons redrawn to be solid, flat and consistent rather than realistic and decorative. A new highlight colour introduced to steer the UI away from KitKat associations. Each decision was about reducing visual noise while maintaining the premium feel the brand demanded.",
        images: [
          { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/vertu_screen_1.webp", caption: "", annotations: ["I used opacity panels rather than gradients — they maintain the integrity of the image and are a more consistent way to define text.", "Information is concentrated into one section, clarifying the interface."] },
          { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/vertu_screen_2.webp", caption: "", annotations: ["A new style, showing events as a calendar view, making it easier for the user to see what's coming up in their interests.", "Date headings stay as part of the background until scrolled to the top, where they bump the previous month out, stick to the title bar and become a separate element. Content then scrolls underneath."] },
          { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/vertu_screen_3.webp", caption: "", annotations: ["Icons are flattened, gradients removed.", "Dividing lines are removed — users understand these are buttons without them.", "Text is reduced in size to be more aligned with the elegant feel of the brand and in keeping with the style guide."] },
          { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/vertu_screen_4.webp", caption: "", annotations: ["In keeping with the new style of Lollipop, I flattened the elements out and defined hierarchy with sharper shadows. Out with the skeuomorphism, in with the material.", "This element appears when the user touches the volume keys or presses the bell in the centre of the dial. It's modelled closely off the original Lollipop design, but the layout and colours had to be redesigned to fit with the other elements on screen.", "Defining areas of content, with the volume toggle icons in the centre."] },
        ],
      },
      {
        number: "03",
        stage: "Refine",
        color: "#ff3e3e",
        content: "I worked across six app areas — Vertu Life, Vertu Care, Concierge, Camera, Dolby Audio and volume control — producing Photoshop mockups, icon designs and UI elements. I contributed to writing the style guide from scratch in collaboration with my senior designer, and produced detailed design specifications in Visio, calculating exact dp measurements for every element to hand to the development team.",
        images: [
          { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/vertu_result_1.webp", caption: "Camera app" },
          { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/vertu_result_2.webp", caption: "Camera button states" },
          { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/vertu_result_3.webp", caption: "Design specifications", annotations: ["For all the designs, icons and elements I had to draw up specifications for the developers using Visio. At first I found it tedious and painstaking, but I grew to appreciate the calculation and precision required in this work — it appealed to my desire for perfection in layout."] },
        ],
      },
      {
        number: "04",
        stage: "Measure",
        color: "#059669",
        content: "Once implemented, I iterated based on feedback from the wider design team, checking designs against the style guide for consistency and against the hardware aesthetic for brand fit.",
        images: [],
      },
    ],
    outcome: {
      summary: "The redesigned UI shipped across the full suite of Vertu apps, bringing a consistent Material Design aesthetic to a product where the bar for quality was exceptionally high. The style guide I co-wrote became the reference point for design decisions across the team. I also designed the clock face and wallpaper collection for the Elena handset. Working at this level of precision in my first UX role gave me a foundation I have drawn on ever since. Vertu was also where I first understood that design isn't just about how something looks — the hardware was extraordinary, my job was to make sure the software deserved to be on the same device.",
      images: [
        { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/vertu_elena.webp", caption: "Elena handset" },
        { src: "https://res.cloudinary.com/ddh2w4p8x/image/upload/vertu_hero.webp", caption: "Vertu Constellation range" },
      ],
      quotes: [],
    },
    images: [],
  },
];

function WorkPanel({ study, total, onClose, onPrev, onNext }) {
  const [lightbox, setLightbox] = useState(null);
  const [annotationsOpen, setAnnotationsOpen] = useState(false);
  const [showMethodology, setShowMethodology] = useState(false);
  const scrollRef = useRef(null);


  // Scroll to top smoothly whenever the study changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [study.id]); // { images: [], index: 0 }

  const openLightbox = (images, index) => { setLightbox({ images, index }); setAnnotationsOpen(false); };
  const closeLightbox = () => { setLightbox(null); setAnnotationsOpen(false); };
  const lightboxPrev = () => { setLightbox(l => ({ ...l, index: (l.index - 1 + l.images.length) % l.images.length })); setAnnotationsOpen(false); };
  const lightboxNext = () => { setLightbox(l => ({ ...l, index: (l.index + 1) % l.images.length })); setAnnotationsOpen(false); };
  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // ESC key closes panel
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        if (lightbox) { closeLightbox(); } else if (showMethodology) { setShowMethodology(false); } else { onClose(); }
      }
      if (e.key === "ArrowLeft"  && lightbox) lightboxPrev();
      if (e.key === "ArrowRight" && lightbox) lightboxNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, lightbox, showMethodology, annotationsOpen]);

  if (!study) return null;

  return (
    <>
      {/* Overlay */}
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(26,26,26,0.5)", backdropFilter: "blur(4px)", zIndex: 300, animation: "fadeOverlay 0.25s ease both" }} />

      {/* Slide-over panel */}
      <div ref={scrollRef} role="dialog" aria-modal="true" aria-label={`Case study: ${study.title}`} aria-describedby="panel-summary" style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "min(680px, 95vw)", background: "#FAFAF8", zIndex: 301, display: "flex", flexDirection: "column", boxShadow: "-12px 0 48px rgba(0,0,0,0.15)", animation: "slideInPanel 0.32s cubic-bezier(0.32,0,0.15,1) both", overflowY: "auto" }}>

        {/* Panel header — sticky */}
        <div style={{ position: "sticky", top: 0, background: "rgba(250,250,248,0.96)", backdropFilter: "blur(12px)", borderBottom: "1px solid #eeeee8", padding: "1rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem", zIndex: 1, flexShrink: 0 }}>
          {/* Prev / Next */}
          <div style={{ display: "flex", gap: "0.4rem" }}>
            <button type="button" onClick={onPrev} style={{ width: 44, height: 44, borderRadius: 4, border: "1.5px solid #e5e5e0", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = study.accent; e.currentTarget.style.color = study.accent; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#e5e5e0"; e.currentTarget.style.color = "#1a1a1a"; }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button type="button" onClick={onNext} style={{ width: 44, height: 44, borderRadius: 4, border: "1.5px solid #e5e5e0", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = study.accent; e.currentTarget.style.color = study.accent; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#e5e5e0"; e.currentTarget.style.color = "#1a1a1a"; }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
          <span style={{ fontSize: "0.72rem", color: "#aaa", letterSpacing: "0.06em" }}>{study.id} / {total}</span>
          <div style={{ flex: 1 }} />
          {/* Close */}
          <button type="button" onClick={onClose} style={{ width: 44, height: 44, borderRadius: 4, border: "1.5px solid #e5e5e0", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#2563EB"; e.currentTarget.style.borderColor = "#2563EB"; e.currentTarget.style.color = "white"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.borderColor = "#e5e5e0"; e.currentTarget.style.color = "#1a1a1a"; }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Panel body */}
        <div style={{ padding: "2rem 1.5rem 3rem", flex: 1 }}>
          {/* Hero image — real if available, placeholder otherwise */}
          {study.heroImage === "chillipharm" ? (
            <div style={{ width: "100%", marginBottom: "1.8rem", borderRadius: 8, overflow: "hidden", border: `1.5px solid ${study.accent}22` }}>
              <img src={"https://res.cloudinary.com/ddh2w4p8x/image/upload/chilli_hero.webp"} alt="ChilliPharm platform — assessment view" style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
          ) : study.heroImage === "vertu" ? (
            <div style={{ width: "100%", marginBottom: "1.8rem", borderRadius: 8, overflow: "hidden", border: `1.5px solid ${study.accent}22` }}>
              <img src={"https://res.cloudinary.com/ddh2w4p8x/image/upload/vertu_hero.webp"} alt="Vertu Constellation luxury Android phones" style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
          ) : study.heroImage === "momentum" ? (
            <div style={{ width: "100%", marginBottom: "1.8rem", borderRadius: 8, overflow: "hidden", border: `1.5px solid ${study.accent}22` }}>
              <img src={"https://res.cloudinary.com/ddh2w4p8x/image/upload/momentum_hero_1.webp"} alt="Momentum Energy redesigned website" style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
          ) : study.heroImage === "strategy" ? (
            <div style={{ width: "100%", marginBottom: "1.8rem", borderRadius: 8, overflow: "hidden", border: `1.5px solid ${study.accent}22` }}>
              <img src={"https://res.cloudinary.com/ddh2w4p8x/image/upload/strategy_hero.webp"} alt="ChilliPharm service design workshop" style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
          ) : (
            <div style={{ width: "100%", height: 200, background: study.thumbBg, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.8rem", border: `1.5px solid ${study.accent}22`, fontSize: "3.5rem", opacity: 0.6 }}>
              {study.thumbIcon}
            </div>
          )}

          {/* Title + meta */}
          <div style={{ marginBottom: "1.8rem" }}>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.7rem" }}>
              {study.tags.map((tag, i) => (
                <span key={i} style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.06em", padding: "0.25rem 0.65rem", borderRadius: 999, background: `${study.tagColors[i]}18`, color: study.tagColors[i] }}>{tag}</span>
              ))}
            </div>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 300, fontSize: "clamp(1.5rem, 3vw, 2rem)", lineHeight: 1.15, letterSpacing: "-0.015em", color: "#1a1a1a", marginBottom: "0.4rem" }}>{study.title}</h2>
            <p style={{ fontSize: "0.8rem", color: study.accent, fontWeight: 500 }}>{study.company} <span style={{ color: "#bbb", fontWeight: 400 }}>· {study.role} · {study.year}</span></p>
          </div>

          {/* Summary */}
          <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "#444", fontWeight: 300, marginBottom: "2rem", paddingBottom: "2rem", borderBottom: "1px solid #eeeee8" }}>{study.summary}</p>

          {/* The Challenge */}
          <div style={{ marginBottom: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.85rem" }}>
              <div style={{ width: 3, height: 20, borderRadius: 2, background: "#DC2626", flexShrink: 0 }} />
              <p style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 300, fontSize: "1.1rem", color: "#1a1a1a", fontStyle: "italic" }}>The Challenge</p>
            </div>
            {typeof study.challenge === "object" ? (
              <div>
                {/* Challenge images — hero + supporting strip */}
                {study.challenge.images && study.challenge.images.length > 0 && (
                  <div style={{ marginBottom: "1.4rem" }}>
                    {study.challenge.images.length === 2 ? (
                      /* Two images — side by side at equal height */
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                        {study.challenge.images.map((img, imgIdx) => (
                          <button type="button"
                            key={imgIdx}
                            onClick={() => openLightbox(study.challenge.images, imgIdx)}
                            aria-label={`View image: ${img.caption}`}
                            style={{ display: "flex", flexDirection: "column", width: "100%", padding: 0, border: "1.5px solid #DC2626", borderRadius: 8, overflow: "hidden", cursor: "zoom-in", background: "none", transition: "border-color 0.2s", height: 180 }}
                            onMouseEnter={e => e.currentTarget.style.borderColor = "#DC2626cc"}
                            onMouseLeave={e => e.currentTarget.style.borderColor = "#DC2626"}
                          >
                            <img src={img.src} alt={img.caption} style={{ width: "100%", flex: 1, objectFit: "cover", objectPosition: "top center", display: "block", minHeight: 0 }} />
                            <div style={{ height: 26, background: "#DC2626", display: "flex", alignItems: "center", padding: "0 0.7rem", flexShrink: 0 }}>
                              <p style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.92)", letterSpacing: "0.04em", lineHeight: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{img.caption}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      /* 3+ images — hero + strip */
                      <>
                        <button type="button"
                          onClick={() => openLightbox(study.challenge.images, 0)}
                          aria-label={`View image: ${study.challenge.images[0].caption}`}
                          style={{ display: "flex", flexDirection: "column", width: "100%", padding: 0, border: "1.5px solid #DC2626", borderRadius: 8, overflow: "hidden", cursor: "zoom-in", background: "none", marginBottom: "0.5rem", transition: "border-color 0.2s", height: 220 }}
                          onMouseEnter={e => e.currentTarget.style.borderColor = "#DC2626cc"}
                          onMouseLeave={e => e.currentTarget.style.borderColor = "#DC2626"}
                        >
                          <img src={study.challenge.images[0].src} alt={study.challenge.images[0].caption} style={{ width: "100%", flex: 1, objectFit: "cover", objectPosition: "top center", display: "block", minHeight: 0 }} />
                          <div style={{ height: 26, background: "#DC2626", display: "flex", alignItems: "center", padding: "0 0.85rem", flexShrink: 0 }}>
                            <p style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.92)", letterSpacing: "0.04em", lineHeight: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{study.challenge.images[0].caption}</p>
                          </div>
                        </button>
                        <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(study.challenge.images.length - 1, 3)}, 1fr)`, gap: "0.5rem" }}>
                          {study.challenge.images.slice(1).map((img, imgIdx) => (
                            <button type="button"
                              key={imgIdx}
                              onClick={() => openLightbox(study.challenge.images, imgIdx + 1)}
                              aria-label={`View image: ${img.caption}`}
                              style={{ display: "flex", flexDirection: "column", width: "100%", padding: 0, border: "1.5px solid #DC2626", borderRadius: 6, overflow: "hidden", cursor: "zoom-in", background: "none", transition: "border-color 0.2s", height: 130 }}
                              onMouseEnter={e => e.currentTarget.style.borderColor = "#DC2626cc"}
                              onMouseLeave={e => e.currentTarget.style.borderColor = "#DC2626"}
                            >
                              <img src={img.src} alt={img.caption} style={{ width: "100%", flex: 1, objectFit: "cover", objectPosition: "top center", display: "block", minHeight: 0 }} />
                              <div style={{ height: 22, background: "#DC2626", display: "flex", alignItems: "center", padding: "0 0.6rem", flexShrink: 0 }}>
                                <p style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.92)", letterSpacing: "0.03em", lineHeight: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{img.caption}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}
                <p style={{ fontSize: "0.93rem", lineHeight: 1.75, color: "#555", fontWeight: 300 }}>{study.challenge.text}</p>
              </div>
            ) : (
              <p style={{ fontSize: "0.93rem", lineHeight: 1.75, color: "#555", fontWeight: 300 }}>{study.challenge}</p>
            )}
          </div>

          {/* My Approach — process steps if array, plain text if string */}
          <div style={{ marginBottom: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.1rem" }}>
              <div style={{ width: 3, height: 20, borderRadius: 2, background: study.accent, flexShrink: 0 }} />
              <p style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 300, fontSize: "1.1rem", color: "#1a1a1a", fontStyle: "italic" }}>My Approach</p>
            </div>
            {Array.isArray(study.approach) ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {study.approach.map((step, i) => (
                  <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    {/* Step indicator */}
                    <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem", paddingTop: "0.15rem" }}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: `${step.color}15`, border: `1.5px solid ${step.color}44`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ fontSize: "0.6rem", fontWeight: 700, color: step.color, letterSpacing: "0.05em" }}>{step.number}</span>
                      </div>
                      {i < study.approach.length - 1 && (
                        <div style={{ width: 1.5, flexGrow: 1, minHeight: 16, background: `linear-gradient(180deg, ${step.color}44, transparent)` }} />
                      )}
                    </div>
                    {/* Step content */}
                    <div style={{ flex: 1, paddingBottom: i < study.approach.length - 1 ? "0.5rem" : 0 }}>
                      <p style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 300, fontSize: "0.93rem", color: step.color, marginBottom: "0.35rem" }}>{step.stage}</p>
                      <p style={{ fontSize: "0.93rem", lineHeight: 1.72, color: "#555", fontWeight: 300, marginBottom: step.images && step.images.length > 0 ? "0.85rem" : 0 }}>{step.content}</p>
                      {/* Thumbnail strip — only renders when images are present */}
                      {step.images && step.images.length > 0 && (
                        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                          {step.images.map((img, imgIdx) => (
                            <button type="button"
                              key={imgIdx}
                              onClick={() => openLightbox(step.images, imgIdx)}
                              style={{ width: 100, height: 70, borderRadius: 6, overflow: "hidden", border: `1.5px solid ${step.color}33`, background: `${step.color}10`, cursor: "pointer", padding: 0, flexShrink: 0, transition: "all 0.2s", position: "relative" }}
                              onMouseEnter={e => { e.currentTarget.style.borderColor = step.color; e.currentTarget.style.transform = "scale(1.04)"; }}
                              onMouseLeave={e => { e.currentTarget.style.borderColor = `${step.color}33`; e.currentTarget.style.transform = "scale(1)"; }}
                              aria-label={`View image: ${step.images[imgIdx].caption || `image ${imgIdx + 1} of ${step.images.length}`}`}
                            >
                              <img src={img.src} alt={img.caption || `${step.stage} process image ${imgIdx + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: "0.93rem", lineHeight: 1.75, color: "#555", fontWeight: 300 }}>{study.approach}</p>
            )}
          </div>

          {/* The Outcome */}
          <div style={{ marginBottom: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.85rem" }}>
              <div style={{ width: 3, height: 20, borderRadius: 2, background: "#2563EB", flexShrink: 0 }} />
              <p style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 300, fontSize: "1.1rem", color: "#1a1a1a", fontStyle: "italic" }}>The Outcome</p>
            </div>
            {typeof study.outcome === "object" ? (
              <div>
                {/* Outcome images — conditional layout */}
                {study.outcome.images && study.outcome.images.length > 0 && (
                  <div style={{ marginBottom: "1.6rem" }}>
                    {study.outcome.images.length === 2 ? (
                      /* Two images — side by side */
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                        {study.outcome.images.map((img, imgIdx) => (
                          <button type="button"
                            key={imgIdx}
                            onClick={() => openLightbox(study.outcome.images, imgIdx)}
                            aria-label={`View image: ${img.caption}`}
                            style={{ display: "flex", flexDirection: "column", width: "100%", padding: 0, border: "1.5px solid #2563EB", borderRadius: 8, overflow: "hidden", cursor: "zoom-in", background: "none", transition: "border-color 0.2s", position: "relative", height: 180 }}
                            onMouseEnter={e => e.currentTarget.style.borderColor = "#2563EBcc"}
                            onMouseLeave={e => e.currentTarget.style.borderColor = "#2563EB"}
                          >
                            <img src={img.src} alt={img.caption} style={{ width: "100%", flex: 1, objectFit: "cover", objectPosition: "top center", display: "block", minHeight: 0 }} />
                            <div style={{ height: 26, background: "#2563EB", display: "flex", alignItems: "center", padding: "0 0.7rem", flexShrink: 0 }}>
                              <p style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.92)", letterSpacing: "0.04em", lineHeight: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{img.caption}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      /* 3+ images — hero + strip */
                      <>
                        <button type="button"
                          onClick={() => openLightbox(study.outcome.images, 0)}
                          aria-label={`View image: ${study.outcome.images[0].caption}`}
                          style={{ display: "flex", flexDirection: "column", width: "100%", padding: 0, border: "1.5px solid #2563EB", borderRadius: 8, overflow: "hidden", cursor: "zoom-in", background: "none", marginBottom: "0.5rem", transition: "border-color 0.2s", position: "relative", height: 220 }}
                          onMouseEnter={e => e.currentTarget.style.borderColor = "#2563EBcc"}
                          onMouseLeave={e => e.currentTarget.style.borderColor = "#2563EB"}
                        >
                          <img src={study.outcome.images[0].src} alt={study.outcome.images[0].caption} style={{ width: "100%", flex: 1, objectFit: "cover", objectPosition: "top center", display: "block", minHeight: 0 }} />
                          <div style={{ height: 26, background: "#2563EB", display: "flex", alignItems: "center", padding: "0 0.85rem", flexShrink: 0 }}>
                            <p style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.92)", letterSpacing: "0.04em", lineHeight: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{study.outcome.images[0].caption}</p>
                          </div>
                        </button>
                        <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(study.outcome.images.length - 1, 3)}, 1fr)`, gap: "0.5rem" }}>
                          {study.outcome.images.slice(1).map((img, imgIdx) => (
                            <button type="button"
                              key={imgIdx}
                              onClick={() => openLightbox(study.outcome.images, imgIdx + 1)}
                              aria-label={`View image: ${img.caption}`}
                              style={{ display: "flex", flexDirection: "column", width: "100%", padding: 0, border: "1.5px solid #2563EB", borderRadius: 6, overflow: "hidden", cursor: "zoom-in", background: "none", transition: "border-color 0.2s", position: "relative", height: 130 }}
                              onMouseEnter={e => e.currentTarget.style.borderColor = "#2563EBcc"}
                              onMouseLeave={e => e.currentTarget.style.borderColor = "#2563EB"}
                            >
                              <img src={img.src} alt={img.caption} style={{ width: "100%", flex: 1, objectFit: "cover", objectPosition: "top center", display: "block", minHeight: 0 }} />
                              <div style={{ height: 22, background: "#2563EB", display: "flex", alignItems: "center", padding: "0 0.6rem", flexShrink: 0 }}>
                                <p style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.92)", letterSpacing: "0.03em", lineHeight: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{img.caption}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}
                {/* Summary text — below images */}
                <p style={{ fontSize: "0.93rem", lineHeight: 1.75, color: "#555", fontWeight: 300, marginBottom: "1.4rem" }}>{study.outcome.summary}</p>
                {/* Stat block */}
                {study.outcome.stat && (
                  <div style={{ marginBottom: "1.4rem" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "1rem", background: "#2563EB10", border: "1.5px solid #2563EB30", borderRadius: 8, padding: "0.9rem 1.4rem" }}>
                      <p style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 300, fontSize: "2rem", color: "#2563EB", lineHeight: 1 }}>{study.outcome.stat.value}</p>
                      <p style={{ fontSize: "0.78rem", color: "#555", fontWeight: 300, maxWidth: 200, lineHeight: 1.5 }}>{study.outcome.stat.label}</p>
                      {study.outcome.stat.methodology && (
                        <button type="button"
                          onClick={() => setShowMethodology(true)}
                          aria-label="View methodology"
                          style={{ width: 32, height: 32, borderRadius: "50%", border: "1.5px solid #2563EB44", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s", color: "#2563EB" }}
                          onMouseEnter={e => { e.currentTarget.style.background = "#2563EB"; e.currentTarget.style.color = "white"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.color = "#2563EB"; }}
                        >
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <circle cx="6" cy="6" r="5.25" stroke="currentColor" strokeWidth="1.5"/>
                            <path d="M6 5.5v3M6 3.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Pull quotes */}
                {study.outcome.quotes && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {study.outcome.quotes.map((q, i) => (
                      <div key={i} style={{ borderLeft: "3px solid #2563EB44", paddingLeft: "1rem", paddingTop: "0.1rem", paddingBottom: "0.1rem" }}>
                        <p style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 300, fontSize: "0.93rem", fontStyle: "italic", color: "#333", lineHeight: 1.65, marginBottom: "0.3rem" }}>"{q.text}"</p>
                        <p style={{ fontSize: "0.72rem", color: "#2563EB", fontWeight: 500, letterSpacing: "0.03em" }}>— {q.attribution}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <p style={{ fontSize: "0.93rem", lineHeight: 1.75, color: "#555", fontWeight: 300 }}>{study.outcome}</p>
            )}
          </div>


          {/* Other projects */}
          {CASE_STUDIES.filter(s => s.id !== study.id).length > 0 && (
            <div style={{ marginTop: "2.5rem", paddingTop: "2rem", borderTop: "1.5px solid #eeeee8" }}>
              <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#aaa", marginBottom: "1rem" }}>Other Projects</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {CASE_STUDIES.filter(s => s.id !== study.id).map(s => (
                  <button type="button"
                    key={s.id}
                    onClick={() => { window.dispatchEvent(new CustomEvent("openStudy", { detail: s.id - 1 })); }}
                    style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.85rem 1rem", border: "1.5px solid #eeeee8", borderRadius: 8, background: "white", cursor: "pointer", textAlign: "left", transition: "all 0.2s", width: "100%" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = s.accent + "55"; e.currentTarget.style.background = s.accent + "06"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "#eeeee8"; e.currentTarget.style.background = "white"; }}
                  >
                    <div style={{ width: 52, height: 36, borderRadius: 5, overflow: "hidden", background: s.thumbBg, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", border: "1.5px solid " + s.accent + "22" }}>
                      {s.heroImage === "chillipharm" ? (
                        <img src={"https://res.cloudinary.com/ddh2w4p8x/image/upload/chilli_thumb.webp"} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : s.heroImage === "vertu" ? (
                        <img src={"https://res.cloudinary.com/ddh2w4p8x/image/upload/vertu_thumb.webp"} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : s.heroImage === "momentum" ? (
                        <img src={"https://res.cloudinary.com/ddh2w4p8x/image/upload/momentum_thumb.webp"} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : s.heroImage === "strategy" ? (
                        <img src={"https://res.cloudinary.com/ddh2w4p8x/image/upload/strategy_thumb.webp"} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <span style={{ opacity: 0.5 }}>{s.thumbIcon}</span>
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#1a1a1a", lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.title}</p>
                      <p style={{ fontSize: "0.72rem", color: s.accent, fontWeight: 500, marginTop: "0.1rem" }}>{s.company}</p>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, color: "#ccc" }}>
                      <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Methodology modal — rendered at root level to avoid overflow clipping */}
      {showMethodology && study.outcome.stat?.methodology && (
        <>
          <div onClick={() => setShowMethodology(false)} aria-hidden="true" style={{ position: "fixed", inset: 0, background: "rgba(26,26,26,0.5)", backdropFilter: "blur(4px)", zIndex: 402 }} />
          <div role="dialog" aria-modal="true" aria-label="Methodology details" style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "min(480px, 90vw)", background: "#FAFAF8", borderRadius: 12, padding: "2rem", zIndex: 403, boxShadow: "0 24px 64px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.2rem" }}>
              <div>
                <div style={{ width: 3, height: 18, background: "#2563EB", borderRadius: 2, display: "inline-block", marginRight: "0.6rem", verticalAlign: "middle" }} />
                <p style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 300, fontSize: "1.05rem", fontStyle: "italic", color: "#1a1a1a", display: "inline" }}>{study.outcome.stat.methodology.headline}</p>
              </div>
              <button type="button" onClick={() => setShowMethodology(false)} aria-label="Close methodology" style={{ width: 44, height: 44, borderRadius: "50%", border: "1.5px solid #e5e5e0", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#2563EB"; e.currentTarget.style.borderColor = "#2563EB"; e.currentTarget.style.color = "white"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.borderColor = "#e5e5e0"; e.currentTarget.style.color = "#1a1a1a"; }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
              </button>
            </div>
            <p style={{ fontSize: "0.85rem", lineHeight: 1.75, color: "#555", fontWeight: 300, marginBottom: "1.4rem" }}>{study.outcome.stat.methodology.body}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
              {study.outcome.stat.methodology.stats.map((s, i) => (
                <div key={i} style={{ background: "white", border: "1.5px solid #eeeee8", borderRadius: 6, padding: "0.7rem 0.9rem" }}>
                  <p style={{ fontSize: "0.68rem", color: "#aaa", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.2rem" }}>{s.label}</p>
                  <p style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 300, fontSize: "1.1rem", color: "#2563EB" }}>{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Lightbox */}
      {lightbox && (
        <>
          {/* Overlay — deep blue-black tint */}
          <div onClick={closeLightbox} role="button" aria-label="Close image viewer" style={{ position: "fixed", inset: 0, background: "rgba(8,16,40,0.94)", backdropFilter: "blur(6px)", zIndex: 400, cursor: "pointer" }} />

          <div style={{ position: "fixed", inset: 0, zIndex: 401, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "1.5rem 1.5rem 5rem", pointerEvents: "none" }}>
            {/* Image */}
            <div style={{ pointerEvents: "auto", maxWidth: "min(860px, 92vw)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img
                src={lightbox.images[lightbox.index].src}
                alt={lightbox.images[lightbox.index].caption || ""}
                style={{ maxWidth: "100%", maxHeight: "72vh", borderRadius: 8, display: "block", boxShadow: "0 24px 80px rgba(0,0,0,0.7)" }}
              />
            </div>

            {/* Caption */}
            {lightbox.images[lightbox.index].caption && (
              <p style={{ pointerEvents: "none", marginTop: "1rem", fontSize: "0.78rem", color: "rgba(255,255,255,0.45)", fontWeight: 300, letterSpacing: "0.02em", textAlign: "center", maxWidth: 520 }}>
                {lightbox.images[lightbox.index].caption}
              </p>
            )}

            {/* Annotations accordion — only when image has annotations */}
            {lightbox.images[lightbox.index].annotations && (
              <div style={{ pointerEvents: "auto", marginTop: "1rem", width: "min(520px, 88vw)" }}>
                <button type="button"
                  onClick={() => setAnnotationsOpen(o => !o)}
                  style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: annotationsOpen ? "6px 6px 0 0" : 6, padding: "0.5rem 0.85rem", cursor: "pointer", width: "100%", transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.14)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
                  aria-expanded={annotationsOpen} aria-controls="annotations-content"
                >
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5.75" stroke="rgba(255,255,255,0.6)" strokeWidth="1.4"/><path d="M6.5 5.5v3.5M6.5 3.5v.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.4" strokeLinecap="round"/></svg>
                  <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.6)", letterSpacing: "0.05em", flex: 1, textAlign: "left" }}>Read annotations</span>
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" style={{ transform: annotationsOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s", flexShrink: 0 }}><path d="M2 4l3.5 3.5L9 4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                {/* Accordion body */}
                <div id="annotations-content" style={{ display: "grid", gridTemplateRows: annotationsOpen ? "1fr" : "0fr", transition: "grid-template-rows 0.3s ease", background: "rgba(255,255,255,0.06)", border: annotationsOpen ? "1px solid rgba(255,255,255,0.15)" : "none", borderTop: "none", borderRadius: "0 0 6px 6px" }}>
                  <div style={{ overflow: "hidden" }}>
                    <div style={{ padding: "0.85rem 1rem", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                      {lightbox.images[lightbox.index].annotations.map((note, i) => (
                        <div key={i} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.4)", flexShrink: 0, marginTop: "0.45rem" }} />
                          <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.65, fontWeight: 300 }}>{note}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Nav bar — fixed pill at bottom centre, always visible, never wraps */}
          <div style={{ position: "fixed", bottom: "1.8rem", left: "50%", transform: "translateX(-50%)", zIndex: 402, display: "flex", alignItems: "center", gap: "0.5rem", background: "linear-gradient(135deg, #2563EB, #1d4ed8)", borderRadius: 999, padding: "0.45rem 0.6rem", whiteSpace: "nowrap" }} role="toolbar" aria-label="Image viewer controls">
            {/* Prev */}
            <button type="button" onClick={lightboxPrev} aria-label="Previous image" style={{ width: 34, height: 34, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.12)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.25)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M8 2L4 6.5l4 4.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>

            {/* Counter — fixed width so it never shifts layout */}
            <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.9)", letterSpacing: "0.1em", fontWeight: 600, minWidth: 32, textAlign: "center", flexShrink: 0 }}>
              {lightbox.index + 1}/{lightbox.images.length}
            </span>

            {/* Next */}
            <button type="button" onClick={lightboxNext} aria-label="Next image" style={{ width: 34, height: 34, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.12)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.25)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M5 2l4 4.5L5 11" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>

            {/* Divider */}
            <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.2)", margin: "0 0.2rem", flexShrink: 0 }} />

            {/* Close */}
            <button type="button" onClick={closeLightbox} aria-label="Close image viewer" style={{ width: 34, height: 34, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.12)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.25)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1 1l9 9M10 1L1 10" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </button>
          </div>
        </>
      )}

      <style>{`
        @keyframes fadeOverlay { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideInPanel { from { transform: translateX(100%); } to { transform: translateX(0); } }
      `}</style>
    </>
  );
}

function ExperienceAccordion() {
  // Allow multiple open at once — no accordion closes when another opens,
  // so page height never shrinks above the user's position. No scroll logic needed.
  const [openSet, setOpenSet] = useState(new Set([0]));

  const handleToggle = (eraIdx) => {
    setOpenSet(prev => {
      const next = new Set(prev);
      if (next.has(eraIdx)) {
        next.delete(eraIdx);
      } else {
        next.add(eraIdx);
      }
      return next;
    });
  };

  return (
    <div lang="en" style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      {CAREER_ERAS.map((era, eraIdx) => {
        const isOpen = openSet.has(eraIdx);
        return (
          <div key={eraIdx} style={{ border: `1.5px solid ${isOpen ? era.accentColor + "55" : "#eeeee8"}`, borderRadius: 10, overflow: "hidden", transition: "border-color 0.3s" }}>

            {/* Accordion header */}
            <button type="button"
              onClick={() => handleToggle(eraIdx)}
              onMouseEnter={e => { if (!isOpen) { e.currentTarget.style.background = `${era.accentColor}06`; e.currentTarget.parentElement.style.borderColor = `${era.accentColor}55`; }}}
              onMouseLeave={e => { if (!isOpen) { e.currentTarget.style.background = "white"; e.currentTarget.parentElement.style.borderColor = "#eeeee8"; }}}
              style={{ width: "100%", background: isOpen ? `${era.accentColor}08` : "white", border: "none", cursor: "pointer", padding: "1.2rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem", textAlign: "left", transition: "background 0.25s" }}>
              {/* Era dot */}
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: era.accentColor, flexShrink: 0, boxShadow: isOpen ? `0 0 0 4px ${era.accentColor}22` : "none", transition: "box-shadow 0.3s" }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", flexWrap: "wrap" }}>
                  <p style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 300, fontSize: "1.05rem", color: isOpen ? era.accentColor : "#1a1a1a", fontStyle: isOpen ? "italic" : "normal", transition: "color 0.25s, font-style 0.25s" }}>{era.era}</p>
                  <span style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.08em", color: "#aaa" }}>{era.range}</span>
                </div>
                <p style={{ fontSize: "0.78rem", color: "#767676", marginTop: "0.15rem", fontWeight: 300 }}>{era.summary}</p>
              </div>
              {/* Chevron */}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease", color: era.accentColor }}>
                <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Accordion body — grid trick animates to exact content height, eliminating post-transition layout shift */}
            <div style={{ display: "grid", gridTemplateRows: isOpen ? "1fr" : "0fr", transition: "grid-template-rows 0.38s ease" }}>
              <div style={{ overflow: "hidden" }}>
                <div style={{ position: "relative", padding: "0.5rem 1.5rem 1.5rem 1.5rem" }}>
                {/* The vertical timeline line — precisely centred through the 14px dots */}
                <div style={{ position: "absolute", left: "calc(1.5rem + 6px)", top: 0, bottom: "1.5rem", width: "2px", background: `linear-gradient(180deg, ${era.accentColor}88, ${era.accentColor}22)` }} />

                {era.jobs.map((job, jobIdx) => (
                  <div key={jobIdx} style={{ display: "flex", gap: "1.2rem", marginTop: jobIdx === 0 ? "0.5rem" : "1.2rem", position: "relative", alignItems: "flex-start" }}>
                    {/* Dot — 14px, centred on the line via the container's calc() left position */}
                    <div style={{ flexShrink: 0, width: 14, height: 14, borderRadius: "50%", background: "white", border: `2.5px solid ${job.color}`, boxShadow: `0 0 0 3px ${job.color}18`, marginTop: "1rem", zIndex: 1 }} />

                    {/* Card */}
                    <div style={{ flex: 1, background: "#FAFAF8", border: "1.5px solid #eeeee8", borderRadius: 8, padding: "1.1rem 1.2rem" }}>

                      {/* Header row */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem", flexWrap: "wrap" }}>
                        <div>
                          <p style={{ fontWeight: 600, fontSize: "0.93rem", color: "#1a1a1a", lineHeight: 1.3 }}>{job.role}</p>
                          <p style={{ fontSize: "0.8rem", color: job.color, fontWeight: 500, marginTop: "0.1rem" }}>
                            {job.company} <span style={{ color: "#bbb", fontWeight: 400 }}>· {job.type}</span>
                          </p>
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          <p style={{ fontSize: "0.72rem", color: "#767676" }}>{job.period}</p>
                          <p style={{ fontSize: "0.68rem", color: "#bbb", marginTop: "0.1rem" }}>{job.location}</p>
                        </div>
                      </div>

                      {/* Highlights */}
                      <div style={{ marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid #f0f0ea" }}>
                        {job.highlights.map((h, hi) => (
                          <div key={hi} style={{ display: "flex", alignItems: "flex-start", gap: "0.55rem", marginBottom: hi < job.highlights.length - 1 ? "0.4rem" : 0 }}>
                            <div style={{ width: 5, height: 5, borderRadius: "50%", background: job.color, flexShrink: 0, marginTop: "0.45rem" }} />
                            <p style={{ fontSize: "0.8rem", color: "#555", lineHeight: 1.55, margin: 0 }} dangerouslySetInnerHTML={{ __html: h }} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              </div> {/* closes overflow:hidden inner div */}
            </div> {/* closes grid panel */}
          </div>
        );
      })}
    </div>
  );
}

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeStudy, setActiveStudy] = useState(null);

  useEffect(() => {
    const handler = (e) => setActiveStudy(e.detail);
    window.addEventListener("openStudy", handler);
    return () => window.removeEventListener("openStudy", handler);
  }, []); // index into CASE_STUDIES

  // ── SEO: inject meta tags into document head ────────────────────────────────
  useEffect(() => {
    document.title = "Jess Dams — Lead Product Designer | Portfolio";
    const setMeta = (sel, attr, val) => {
      let el = document.querySelector(sel);
      if (!el) { el = document.createElement("meta"); document.head.appendChild(el); }
      el.setAttribute(attr, val);
    };
    document.title = "Jess Dams — Lead Product Designer";
    setMeta('meta[name="description"]',          "content", "Lead Product Designer with 10+ years across healthcare SaaS, energy, luxury tech and consumer retail. Available for senior and lead roles, remote full-time.");
    setMeta('meta[name="author"]',               "content", "Jess Dams");
    setMeta('meta[name="robots"]',               "content", "index, follow");
    setMeta('meta[property="og:type"]',          "property", "og:type");
    setMeta('meta[property="og:type"]',          "content",  "website");
    setMeta('meta[property="og:url"]',           "property", "og:url");
    setMeta('meta[property="og:url"]',           "content",  "https://jessdams.com");
    setMeta('meta[property="og:title"]',         "property", "og:title");
    setMeta('meta[property="og:title"]',         "content",  "Jess Dams — Lead Product Designer");
    setMeta('meta[property="og:description"]',   "property", "og:description");
    setMeta('meta[property="og:description"]',   "content",  "Lead Product Designer with 10+ years across healthcare SaaS, energy, luxury tech and consumer retail.");
    setMeta('meta[property="og:image"]',         "property", "og:image");
    setMeta('meta[property="og:image"]',         "content",  "https://jessdams.com/og-image.jpg");
    setMeta('meta[name="twitter:card"]',         "content",  "summary_large_image");
    setMeta('meta[name="twitter:title"]',        "content",  "Jess Dams — Lead Product Designer");
    setMeta('meta[name="twitter:description"]',  "content",  "Lead Product Designer with 10+ years across healthcare SaaS, energy, luxury tech and consumer retail.");
    setMeta('meta[name="twitter:image"]',        "content",  "https://jessdams.com/og-image.jpg");
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = "https://jessdams.com";
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#FAFAF8", color: "#1a1a1a", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #FAFAF8; }
        .nav-link { position: relative; font-size: 0.78rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: #1a1a1a; text-decoration: none; cursor: pointer; transition: color 0.2s; }
        .nav-link::after { content: ''; position: absolute; bottom: -3px; left: 0; width: 0; height: 1.5px; background: #2563EB; transition: width 0.3s ease; }
        .nav-link:hover { color: #2563EB; }
        .nav-link:hover::after { width: 100%; }
        .skill-pill { display: inline-block; padding: 0.28rem 0.78rem; border-radius: 999px; font-size: 0.73rem; font-weight: 500; letter-spacing: 0.02em; color: white; margin: 0.2rem; }
        .gem-ring { position: absolute; border-radius: 50%; filter: blur(52px); opacity: 0.13; pointer-events: none; }
        .divider { width: 44px; height: 3px; margin: 1.1rem 0 1.8rem; }
        .stat-card { padding: 1.4rem 1.6rem; border: 1.5px solid #e5e5e0; margin-bottom: 0.85rem; background: #FAFAF8; transition: box-shadow 0.25s, border-color 0.25s; border-radius: 4px; }
        .contact-row { display: flex; align-items: center; gap: 0.7rem; font-size: 0.98rem; padding: 0.9rem 1.8rem; border-radius: 4px; text-decoration: none; color: #1a1a1a; transition: all 0.2s; width: 100%; max-width: 420px; justify-content: center; border: 1.5px solid transparent; }
        .ai-card { border: 1.5px solid #e8e8e2; border-radius: 8px; padding: 1.4rem; background: white; transition: all 0.25s; cursor: default; }
        .ai-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.06); }
        .hire-btn { background: #ff3e3e; color: white; border: none; padding: 0.5rem 1.3rem; font-size: 0.74rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; border-radius: 4px; transition: background 0.2s, transform 0.15s; }
        .hire-btn:hover { background: #d42e2e; transform: translateY(-1px); }
        .tcard { background: white; border: 1.5px solid #eeeee8; border-radius: 8px; padding: 1.8rem; display: flex; flex-direction: column; gap: 1.2rem; }
        .tcard-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.1rem; }
        .work-card { background: white; border-radius: 8px; overflow: hidden; cursor: pointer; transition: box-shadow 0.25s, transform 0.25s, border-color 0.25s; }
        .work-card:hover { transform: translateY(-3px); box-shadow: 0 14px 36px rgba(0,0,0,0.09); }
        .work-card-thumb { width: 100%; height: 200px; display: flex; align-items: center; justify-content: center; font-size: 3rem; transition: opacity 0.25s; overflow: hidden; }
        .work-card-thumb img { width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; transition: opacity 0.25s; }
        .work-card-body { padding: 1.2rem 1.3rem 1.4rem; }
        .work-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
        @media (max-width: 640px) { .work-grid { grid-template-columns: 1fr !important; } }
        .timeline-line { position: absolute; left: 15px; top: 0; bottom: 0; width: 2px; background: linear-gradient(180deg, #2563EB, #7C3AED, #0891B2); }
        .timeline-dot { position: absolute; left: 7px; width: 18px; height: 18px; border-radius: 50%; border: 2.5px solid white; box-shadow: 0 0 0 2px currentColor; background: white; flex-shrink: 0; }
        @media (max-width: 900px) { .tcard-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 580px) { .tcard-grid { grid-template-columns: 1fr !important; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes bounce { 0%,100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(7px); } }
        @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        .hamburger { display: none; flex-direction: column; justify-content: center; gap: 5px; background: none; border: none; cursor: pointer; padding: 6px; border-radius: 4px; transition: background 0.2s; z-index: 201; }
        .hamburger:hover { background: rgba(0,0,0,0.05); }
        .hamburger span { display: block; width: 22px; height: 2px; background: #1a1a1a; border-radius: 2px; transition: all 0.3s ease; transform-origin: center; }
        .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
        .mobile-overlay { display: none; position: fixed; inset: 0; background: rgba(26,26,26,0.45); backdrop-filter: blur(4px); z-index: 149; }
        .mobile-drawer { display: none; position: fixed; top: 0; right: 0; bottom: 0; width: min(320px, 85vw); background: #FAFAF8; z-index: 150; flex-direction: column; padding: 5rem 2.5rem 3rem; box-shadow: -8px 0 40px rgba(0,0,0,0.12); animation: slideIn 0.3s ease both; }
        .mobile-drawer .mob-link { font-family: 'DM Serif Display', serif; font-size: 1.9rem; font-style: italic; color: #1a1a1a; cursor: pointer; padding: 0.6rem 0; border-bottom: 1px solid #e8e8e2; transition: color 0.2s; display: block; }
        .mobile-drawer .mob-link:hover { color: #2563EB; }
        .mobile-drawer .mob-hire { display: block; margin-top: 2rem; width: 100%; text-align: center; }
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
          .mobile-overlay.open { display: block; }
          .mobile-drawer.open { display: flex; }
        }
        @media (max-width: 820px) {
          .hero-grid { flex-direction: column !important; align-items: flex-start !important; }
          .section-header-center { text-align: center; }

          :focus-visible {
            outline: 3px solid #2563EB;
            outline-offset: 3px;
            border-radius: 2px;
          }
          button:focus-visible, a:focus-visible {
            outline: 3px solid #2563EB;
            outline-offset: 3px;
          }
          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
          .section-header-center p:last-child { margin-left: auto; margin-right: auto; }
          @media (max-width: 700px) { .section-header-center { text-align: left; } .section-header-center p:last-child { margin-left: 0 !important; margin-right: 0 !important; } }
          .hero-firstname { display: inline; }
          @media (min-width: 820px) { .hero-grid { max-width: 780px !important; } }
          .about-grid { flex-direction: column !important; }
          .photo-outer { width: 260px !important; height: 260px !important; }
          .ai-grid { grid-template-columns: 1fr 1fr !important; }
          .timeline-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 540px) {
          .ai-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav aria-label="Main navigation" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, background: scrolled || mobileOpen ? "rgba(250,250,248,0.97)" : "transparent", backdropFilter: scrolled || mobileOpen ? "blur(14px)" : "none", borderBottom: scrolled ? "1px solid #e8e8e2" : "none", transition: "background 0.3s ease, border-color 0.3s ease", padding: "0 2rem" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <button type="button" onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setMobileOpen(false); }} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Serif Display', serif", fontWeight: 300, fontSize: "1.05rem", color: "#1a1a1a", zIndex: 201 }}>
            Jess Dams
          </button>

          {/* Desktop links */}
          <div className="desktop-nav" style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            {["About", "Process", "Experience", "AI Tools", "Work", "Testimonials"].map(l => (
              <span key={l} className="nav-link" onClick={() => scrollTo(l.toLowerCase())}>{l}</span>
            ))}
            <button type="button" className="hire-btn" onClick={() => scrollTo("contact")}>Contact</button>
          </div>

          {/* Hamburger */}
          <button type="button" className={`hamburger${mobileOpen ? " open" : ""}`} onClick={() => setMobileOpen(o => !o)} aria-label="Toggle menu" aria-expanded={mobileOpen}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div className={`mobile-overlay${mobileOpen ? " open" : ""}`} onClick={() => setMobileOpen(false)} />

      {/* Mobile drawer */}
      <div className={`mobile-drawer${mobileOpen ? " open" : ""}`}>
        <p style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#ff3e3e", marginBottom: "1.8rem" }}>Navigation</p>
        {[
          { label: "About", id: "about" },
          { label: "Process", id: "process" },
          { label: "Experience", id: "experience" },
          { label: "AI Tools", id: "ai-tools" },
          { label: "Work", id: "work" },
          { label: "Testimonials", id: "testimonials" },
        ].map((item, i) => (
          <span key={i} className="mob-link" onClick={() => scrollTo(item.id)}>{item.label}</span>
        ))}
        <div className="mob-hire">
          <button type="button" className="hire-btn" onClick={() => scrollTo("contact")} style={{ width: "100%", padding: "0.85rem", fontSize: "0.8rem" }}>
            Contact
          </button>
        </div>
        {/* Decorative gem dot */}
        <div style={{ marginTop: "auto", display: "flex", gap: "0.5rem", paddingTop: "2rem" }}>
          {["#2563EB","#7C3AED","#ff3e3e"].map(c => (
            <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
          ))}
        </div>
      </div>

      {/* ── HERO ── */}
      <a href="#main-content" style={{ position: "absolute", top: -40, left: 16, zIndex: 9999, background: "#2563EB", color: "white", padding: "0.5rem 1rem", borderRadius: 4, fontSize: "0.85rem", fontWeight: 600, textDecoration: "none", transition: "top 0.2s" }}
        onFocus={e => e.currentTarget.style.top = "16px"}
        onBlur={e => e.currentTarget.style.top = "-40px"}>Skip to main content</a>
      <main id="main-content">
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 2rem", paddingTop: 64, paddingBottom: 100, position: "relative", overflow: "hidden" }}>
        <div className="gem-ring" style={{ width: 560, height: 560, background: "#2563EB", top: -140, right: -100 }} />
        <div className="gem-ring" style={{ width: 380, height: 380, background: "#7C3AED", bottom: 40, left: -120 }} />
        <div className="gem-ring" style={{ width: 260, height: 260, background: "#0891B2", top: "35%", right: "18%" }} />

        <div className="hero-grid" style={{ maxWidth: 780, margin: "0 auto", width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>


          {/* ── Photo ── */}
          <div style={{ alignSelf: "center", flexShrink: 0, animation: "fadeUp 0.9s ease 0.25s both", marginBottom: "2.5rem" }}>
            <div className="photo-outer" style={{ width: 280, height: 280, position: "relative" }}>
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(140deg, #2563EB 0%, #7C3AED 52%, #0891B2 100%)",
                borderRadius: "38% 62% 44% 56% / 56% 44% 56% 44%",
                transform: "scale(1.07) rotate(-3deg)",
              }} />
              <div style={{
                position: "absolute", inset: 8,
                borderRadius: "36% 64% 42% 58% / 54% 46% 54% 46%",
                overflow: "hidden",
                background: "#FAFAF8",
              }}>
                <img
                  src={"https://res.cloudinary.com/ddh2w4p8x/image/upload/photo.jpg"}
                  alt="Jess Dams"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 15%", display: "block" }}
                />
              </div>
              <div style={{ position: "absolute", bottom: -14, right: -20, background: "#ff3e3e", color: "white", padding: "0.65rem 1.05rem", borderRadius: 4, boxShadow: "0 6px 20px #ff3e3e44" }}>
                <p style={{ fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.85 }}>Available for</p>
                <p style={{ fontSize: "0.8rem", fontWeight: 700 }}>New Roles</p>
              </div>
            </div>
          </div>

          {/* ── Text ── */}
          <div style={{ animation: "fadeUp 0.9s ease 0.05s both", width: "100%" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#ff3e3e14", border: "1px solid #ff3e3e44", borderRadius: 999, padding: "0.3rem 0.9rem", marginBottom: "1.1rem" }}>
              <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#ff3e3e" }}>✦ AI-Informed Designer</span>
            </div>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 300, fontSize: "clamp(3rem, 6vw, 5.4rem)", lineHeight: 1.02, letterSpacing: "-0.025em", marginBottom: "1.5rem" }}>
              <span className="hero-firstname">Jess </span><span style={{ fontStyle: "italic", color: "#2563EB" }}>Dams</span>
            </h1>
            <p style={{ fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#7C3AED", marginBottom: "1rem" }}>
              Product Design Lead · 10+ Years · Global Experience
            </p>
            <p style={{ fontSize: "1rem", lineHeight: 1.78, color: "#555", marginBottom: "2.4rem", fontWeight: 300 }}>
              I'm a natural problem-solver who uses data and human insight to design products people love; specialising in{" "}
              <strong style={{ fontWeight: 600, color: "#1a1a1a" }}>complex, data-rich products</strong>, with{" "}
              <strong style={{ fontWeight: 600, color: "#ff3e3e" }}>AI to move faster</strong>, always with a human in the loop.
            </p>
            <div style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap" }}>
              <button type="button" onClick={() => scrollTo("about")}
                className="hire-btn"
                style={{ padding: "0.85rem 2rem", fontSize: "0.78rem", letterSpacing: "0.07em" }}>
                About Me
              </button>
              <button type="button" onClick={() => scrollTo("contact")}
                style={{ background: "#1a1a1a", color: "white", border: "none", padding: "0.85rem 2rem", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", cursor: "pointer", borderRadius: 4, transition: "background 0.2s, transform 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#2563EB"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#1a1a1a"; e.currentTarget.style.transform = "translateY(0)"; }}>
                Contact
              </button>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.35rem", opacity: 0.35, animation: "bounce 2.8s ease infinite" }}>
          <span style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>Scroll</span>
          <svg width="14" height="20" viewBox="0 0 14 20" fill="none"><path d="M7 1v14M3 11l4 5 4-5" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" aria-label="About Me" style={{ padding: "7rem 2rem", background: "white" }}>
        <div className="about-grid" style={{ maxWidth: 1080, margin: "0 auto", display: "flex", gap: "5rem", alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            <FadeIn>
              <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#7C3AED", marginBottom: "0.7rem" }}>About Me</p>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 300, fontSize: "clamp(2rem, 3.8vw, 3.1rem)", lineHeight: 1.1, letterSpacing: "-0.015em" }}>
                Designing for <em style={{ color: "#2563EB" }}>people</em>,<br />directed by <em style={{ color: "#ff3e3e" }}>judgement</em>
              </h2>
              <div className="divider" style={{ background: "#2563EB" }} />
            </FadeIn>
            {ABOUT_PARAGRAPHS.map((p, i) => (
              <FadeIn key={i} delay={0.08 * (i + 1)}>
                <p style={{ fontSize: "1rem", lineHeight: 1.82, color: "#444", marginBottom: "1rem", fontWeight: 300 }}>{p}</p>
              </FadeIn>
            ))}
            <FadeIn delay={0.32}>
              <div style={{ marginTop: "2rem" }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#999", marginBottom: "0.7rem" }}>Core Skills</p>
                <div>
                  {SKILLS.map((s, i) => (
                    <span key={i} className="skill-pill" style={{ background: s.color }}>{s.label}</span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right column stat cards, pull quote, certifications — commented out */}
          {/* <div style={{ flexShrink: 0, width: 300 }}>
            {[
              { num: "10+", label: "Years of experience", color: "#2563EB" },
              { num: "6", label: "Companies across UK & Australia", color: "#7C3AED" },
              { num: "5yrs", label: "Leading design at ChilliPharm", color: "#0891B2" },
              { num: "1", label: "Design system built from scratch", color: "#ff3e3e" },
              { num: "1", label: "Junior designer hired & trained from zero", color: "#059669" },
            ].map((s, i) => (
              <FadeIn key={i} delay={0.08 * i}>
                <div className="stat-card" style={{ borderLeft: `4px solid ${s.color}` }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 6px 22px ${s.color}22`; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; }}>
                  <p style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 300, fontSize: "1.85rem", color: s.color, lineHeight: 1 }}>{s.num}</p>
                  <p style={{ fontSize: "0.78rem", color: "#666", marginTop: "0.28rem" }}>{s.label}</p>
                </div>
              </FadeIn>
            ))}
          </div> */}
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" aria-label="Design process" style={{ padding: "7rem 2rem", background: "#FAFAF8", position: "relative", overflow: "hidden" }}>
        <div className="gem-ring" style={{ width: 400, height: 400, background: "#2563EB", top: -140, right: -100, opacity: 0.08 }} />
        <div className="gem-ring" style={{ width: 300, height: 300, background: "#7C3AED", bottom: -80, left: -60, opacity: 0.08 }} />

        <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative" }}>
          <FadeIn>
            <div style={{ marginBottom: "4rem", textAlign: "center" }}>
              <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#7C3AED", marginBottom: "0.7rem" }}>How I Work</p>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 300, fontSize: "clamp(2rem, 3.8vw, 3.1rem)", lineHeight: 1.1, letterSpacing: "-0.015em", textAlign: "center" }}>
                My design <em style={{ color: "#2563EB" }}>process</em>
              </h2>
            </div>
          </FadeIn>

          {/* Desktop: horizontal timeline — Mobile: vertical stack */}
          <style>{`
            .process-grid {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 0;
              position: relative;
            }
            .process-grid::before {
              content: '';
              position: absolute;
              top: 22px;
              left: calc(12.5% + 1px);
              right: calc(12.5% + 1px);
              height: 2px;
              background: linear-gradient(90deg, #2563EB, #7C3AED, #ff3e3e, #059669);
              z-index: 0;
            }
            .process-step {
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
              padding: 0 1rem;
              position: relative;
            }
            .process-dot {
              width: 44px;
              height: 44px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 1.1rem;
              position: relative;
              z-index: 1;
              flex-shrink: 0;
              margin-bottom: 1.4rem;
              transition: transform 0.25s ease, box-shadow 0.25s ease;
            }
            .process-step:hover .process-dot {
              transform: translateY(-3px) scale(1.08);
            }
            .process-connector {
              display: none;
            }
            @media (max-width: 700px) {
              .process-grid {
                grid-template-columns: 1fr;
                gap: 0;
              }
              .process-grid::before {
                display: none;
              }
              .process-step {
                flex-direction: row;
                text-align: left;
                align-items: flex-start;
                padding: 0 0 2.5rem 0;
                gap: 1.3rem;
              }
              .process-dot {
                margin-bottom: 0;
                flex-shrink: 0;
              }
              .process-connector {
                display: block;
                position: absolute;
                left: 21px;
                top: 44px;
                bottom: 0;
                width: 2px;
                background: linear-gradient(180deg, var(--dot-color), transparent);
                z-index: 0;
              }
              .process-step:last-child .process-connector {
                display: none;
              }
            }
          `}</style>

          <div className="process-grid">
            {[
              {
                number: "01",
                stage: "Understand",
                icon: "◎",
                color: "#2563EB",
                bg: "#2563EB18",
                shadow: "#2563EB33",
                whatBold: "Deep problem definition:", what: "user needs, business goals, constraints. No solution until the problem is clear.",
                principle: "\"Understand the problem deeply before touching the solution.\"",
              },
              {
                number: "02",
                stage: "Simplify",
                icon: "◈",
                color: "#7C3AED",
                bg: "#7C3AED18",
                shadow: "#7C3AED33",
                whatBold: "Ideation and concept work:", what: "reducing complexity, eliminating friction, designing for the distracted user.",
                principle: "\"Don't make the user think. Every extra decision is friction, and friction is where products lose people.\"",
              },
              {
                number: "03",
                stage: "Refine",
                icon: "✦",
                color: "#ff3e3e",
                bg: "#ff3e3e18",
                shadow: "#ff3e3e33",
                whatBold: "UI, interaction design, and subtraction:", what: "removing anything that doesn't earn its place on the screen.",
                principle: "\"What can we take away? Simple is harder than complex — and always worth the effort.\"",
              },
              {
                number: "04",
                stage: "Measure",
                icon: "◆",
                color: "#059669",
                bg: "#05966918",
                shadow: "#05966933",
                whatBold: "Post-launch analysis:", what: "user behaviour, outcomes, iteration. Design doesn't end at handoff.",
                principle: "\"I measure success by whether the product improved someone's day, not by whether my design made it to production.\"",
              },
            ].map((step, i) => (
              <FadeIn key={i} delay={0.1 * i}>
                <div className="process-step" style={{ "--dot-color": step.color }}>
                  {/* Vertical connector line (mobile only) */}
                  <div className="process-connector" />

                  {/* Dot — white base ensures the connecting line doesn't show through the tinted background */}
                  <div className="process-dot" style={{ background: "white", boxShadow: `0 0 0 6px ${step.shadow}`, color: step.color, border: `2px solid ${step.color}22` }}>
                    <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: step.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: "1.1rem" }}>{step.icon}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    {/* Stage number + name */}
                    <div style={{ marginBottom: "0.6rem" }}>
                      <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.18em", color: step.color, display: "block", marginBottom: "0.2rem" }}>{step.number}</span>
                      <p style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 300, fontSize: "1.25rem", color: "#1a1a1a", lineHeight: 1.2 }}>{step.stage}</p>
                    </div>

                    {/* What happens */}
                    <p style={{ fontSize: "0.85rem", color: "#666", lineHeight: 1.65, fontWeight: 300, marginBottom: "1rem" }}>{step.whatBold && <strong style={{ fontWeight: 600, color: "#1a1a1a" }}>{step.whatBold}</strong>}{step.whatBold ? " " : ""}{step.what}</p>

                    {/* Philosophy quote */}
                    <div style={{ borderLeft: `3px solid ${step.color}`, paddingLeft: "0.85rem" }}>
                      <p style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 300, fontSize: "0.85rem", fontStyle: "italic", color: "#444", lineHeight: 1.65 }}>{step.principle}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" aria-label="Career experience" style={{ padding: "7rem 2rem", background: "white" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ marginBottom: "3.5rem", textAlign: "center" }}>
              <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#2563EB", marginBottom: "0.7rem" }}>Career</p>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 300, fontSize: "clamp(2rem, 3.8vw, 3.1rem)", lineHeight: 1.1, letterSpacing: "-0.015em", textAlign: "center" }}>
                Where I've <em style={{ color: "#7C3AED" }}>worked</em>
              </h2>
              <p style={{ fontSize: "0.93rem", color: "#767676", fontWeight: 300, marginTop: "0.8rem", textAlign: "center" }}>Click any chapter to explore the detail.</p>
            </div>
          </FadeIn>

          <ExperienceAccordion />

          {/* Education */}
          <FadeIn delay={0.2}>
            <div style={{ marginTop: "3rem", paddingTop: "2.5rem", borderTop: "1.5px solid #eeeee8" }}>
              <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#999", marginBottom: "1rem" }}>Education</p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                {[
                  { degree: "BA Hons, Illustration", school: "University for the Creative Arts", period: "2006 – 2009" },
                  { degree: "Foundation Degree, Graphic Media", school: "University for the Creative Arts", period: "2004 – 2005" },
                ].map((ed, i) => (
                  <div key={i} style={{ flex: "1 1 260px", padding: "1rem 1.2rem", border: "1.5px solid #eeeee8", borderRadius: 8, background: "#FAFAF8" }}>
                    <p style={{ fontWeight: 600, fontSize: "0.85rem", color: "#1a1a1a" }}>{ed.degree}</p>
                    <p style={{ fontSize: "0.72rem", color: "#767676", marginTop: "0.2rem" }}>{ed.school} · {ed.period}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── AI TOOLS ── */}
      <section id="ai-tools" aria-label="AI tools I use" style={{ padding: "7rem 2rem", background: "#FAFAF8" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ marginBottom: "3.5rem", textAlign: "center" }}>
              <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#ff3e3e", marginBottom: "0.7rem" }}>AI Toolkit</p>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 300, fontSize: "clamp(2rem, 3.8vw, 3.1rem)", lineHeight: 1.1, letterSpacing: "-0.015em", textAlign: "center" }}>
                Tools I use to <em style={{ color: "#ff3e3e" }}>work smarter</em>
              </h2>
              <p style={{ fontSize: "0.93rem", color: "#666", fontWeight: 300, marginTop: "1rem", maxWidth: 520, margin: "1rem auto 0", textAlign: "center" }}>
                I use AI to accelerate the right parts of my process. But judgement, empathy, and the instinct about what will actually resonate — those only come from experience. They stay with me.
              </p>
            </div>
          </FadeIn>

          <div className="ai-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.1rem" }}>
            {AI_TOOLS.map((tool, i) => (
              <FadeIn key={i} delay={0.07 * i}>
                <div className="ai-card">
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.9rem", marginBottom: "0.9rem" }}>
                    <div style={{ width: 40, height: 40, borderRadius: 8, background: tool.iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden" }}>
                      <img src={tool.svgIcon} alt={tool.name} style={{ width: 40 - (tool.iconPad * 2), height: 40 - (tool.iconPad * 2), objectFit: "contain", display: "block" }} />
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: "0.93rem", color: "#1a1a1a", lineHeight: 1.2 }}>{tool.name}</p>
                      <p style={{ fontSize: "0.72rem", color: "#999", letterSpacing: "0.03em", marginTop: "0.15rem" }}>{tool.by}</p>
                    </div>
                  </div>
                  <div style={{ height: 2, background: `linear-gradient(90deg, ${tool.color}66, ${tool.color}00)`, borderRadius: 1, marginBottom: "0.85rem" }} />
                  <p style={{ fontSize: "0.85rem", color: "#555", lineHeight: 1.6, fontWeight: 300 }}>{tool.use}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORK ── */}
      <section id="work" aria-label="Selected work" style={{ padding: "7rem 2rem", background: "white" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ marginBottom: "3.5rem", textAlign: "center" }}>
              <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#DC2626", marginBottom: "0.7rem" }}>Selected Work</p>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 300, fontSize: "clamp(2rem, 3.8vw, 3.1rem)", lineHeight: 1.1, letterSpacing: "-0.015em", textAlign: "center" }}>
                Things I've <em style={{ color: "#2563EB" }}>built</em>
              </h2>
              <p style={{ fontSize: "0.93rem", color: "#767676", fontWeight: 300, marginTop: "0.8rem", textAlign: "center" }}>
                Click any project to see the story behind it — the challenge, approach, and outcome.
              </p>
            </div>
          </FadeIn>

          <div className="work-grid">
            {CASE_STUDIES.map((study, i) => (
              <FadeIn key={study.id} delay={0.08 * i}>
                <div className="work-card"
                  onClick={() => setActiveStudy(i)}
                  onKeyDown={e => (e.key === "Enter" || e.key === " ") && setActiveStudy(i)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View case study: ${study.title} — ${study.company}`}
                  style={{ borderTop: `3px solid ${study.accent}`, borderRight: "1.5px solid #eeeee8", borderBottom: "1.5px solid #eeeee8", borderLeft: "1.5px solid #eeeee8" }}
                  onMouseEnter={e => { e.currentTarget.style.borderRightColor = study.accent; e.currentTarget.style.borderBottomColor = study.accent; e.currentTarget.style.borderLeftColor = study.accent; }}
                  onMouseLeave={e => { e.currentTarget.style.borderRightColor = "#eeeee8"; e.currentTarget.style.borderBottomColor = "#eeeee8"; e.currentTarget.style.borderLeftColor = "#eeeee8"; }}>

                  {/* Thumbnail placeholder */}
                  <div className="work-card-thumb" style={{ background: study.thumbBg }}>
                    {study.heroImage === "chillipharm" ? (
                      <img src={"https://res.cloudinary.com/ddh2w4p8x/image/upload/chilli_thumb.webp"} alt="ChilliPharm platform" />
                    ) : study.heroImage === "vertu" ? (
                      <img src={"https://res.cloudinary.com/ddh2w4p8x/image/upload/vertu_thumb.webp"} alt="Vertu luxury Android phones" />
                    ) : study.heroImage === "momentum" ? (
                      <img src={"https://res.cloudinary.com/ddh2w4p8x/image/upload/momentum_thumb.webp"} alt="Momentum Energy website" />
                    ) : study.heroImage === "strategy" ? (
                      <img src={"https://res.cloudinary.com/ddh2w4p8x/image/upload/strategy_thumb.webp"} alt="ChilliPharm service design" />
                    ) : (
                      <span style={{ fontSize: "3.2rem", opacity: 0.5 }}>{study.thumbIcon}</span>
                    )}
                  </div>

                  {/* Card body */}
                  <div className="work-card-body">
                    <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "0.7rem" }}>
                      {study.tags.map((tag, ti) => (
                        <span key={ti} style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.05em", padding: "0.2rem 0.55rem", borderRadius: 999, background: `${study.tagColors[ti]}18`, color: study.tagColors[ti] }}>{tag}</span>
                      ))}
                    </div>
                    <p style={{ fontWeight: 600, fontSize: "0.93rem", color: "#1a1a1a", lineHeight: 1.3, marginBottom: "0.3rem" }}>{study.title}</p>
                    <p style={{ fontSize: "0.78rem", color: study.accent, fontWeight: 500, marginBottom: "0.6rem" }}>
                      {study.company} <span style={{ color: "#bbb", fontWeight: 400 }}>· {study.year}</span>
                    </p>
                    <p style={{ fontSize: "0.8rem", color: "#666", lineHeight: 1.55, fontWeight: 300, marginBottom: "1rem" }}>{study.cardSummary || study.summary}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.72rem", fontWeight: 600, color: study.accent, letterSpacing: "0.04em" }}>
                      <span>View case study</span>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" aria-label="Testimonials" style={{ padding: "7rem 2rem", background: "white", position: "relative", overflow: "hidden" }}>
        {/* Subtle background texture */}
        <div className="gem-ring" style={{ width: 500, height: 500, background: "#7C3AED", top: -180, left: -140, opacity: 0.07 }} />
        <div className="gem-ring" style={{ width: 350, height: 350, background: "#2563EB", bottom: -100, right: -80, opacity: 0.07 }} />

        <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative" }}>
          <FadeIn>
            <div style={{ marginBottom: "4rem", textAlign: "center" }}>
              <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#059669", marginBottom: "0.7rem" }}>Social Proof</p>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 300, fontSize: "clamp(2rem, 3.8vw, 3.1rem)", lineHeight: 1.1, letterSpacing: "-0.015em", textAlign: "center" }}>
                What colleagues <em style={{ color: "#2563EB" }}>say</em>
              </h2>
              <p style={{ fontSize: "0.93rem", color: "#666", fontWeight: 300, marginTop: "0.9rem", maxWidth: 480, margin: "0.9rem auto 0", textAlign: "center" }}>
                Feedback from managers, peers, and collaborators across my career.
              </p>
            </div>
          </FadeIn>

          {/* Featured quote — largest, most authoritative (boss quote) */}
          <FadeIn delay={0.05}>
            <div style={{ marginBottom: "1.1rem", padding: "2.4rem 2.8rem", background: "linear-gradient(135deg, #2563EB08, #7C3AED0d)", border: "1.5px solid #2563EB22", borderRadius: 8, borderLeft: "5px solid #2563EB", position: "relative" }}>
              <div style={{ position: "absolute", top: "1.6rem", right: "2rem", fontFamily: "'DM Serif Display', serif", fontWeight: 300, fontSize: "5rem", lineHeight: 1, color: "#2563EB", opacity: 0.12, userSelect: "none" }}>"</div>
              <p style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 300, fontSize: "clamp(1.05rem, 2vw, 1.25rem)", lineHeight: 1.7, color: "#222", fontStyle: "italic", maxWidth: 820, marginBottom: "1.4rem" }}>
                "{TESTIMONIALS[1].quote}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg, #2563EB, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: "0.85rem", flexShrink: 0 }}>
                  {TESTIMONIALS[1].initial}
                </div>
                <div>
                  <p style={{ fontWeight: 600, fontSize: "0.85rem", color: "#1a1a1a" }}>{TESTIMONIALS[1].name}</p>
                  <p style={{ fontSize: "0.72rem", color: "#2563EB", fontWeight: 500 }}>{TESTIMONIALS[1].company}</p>
                </div>
                <div style={{ marginLeft: "auto", padding: "0.25rem 0.75rem", background: "#2563EB12", borderRadius: 999, fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2563EB" }}>
                  Featured
                </div>
              </div>
            </div>
          </FadeIn>

          {/* 3-column grid for remaining 5 */}
          <div className="tcard-grid">
            {[TESTIMONIALS[0], TESTIMONIALS[2], TESTIMONIALS[3], TESTIMONIALS[4], TESTIMONIALS[5]].map((t, i) => (
              <FadeIn key={i} delay={0.08 * (i + 1)}>
                <div className="tcard">
                  {/* Top colour accent line */}
                  <div style={{ height: 3, background: `linear-gradient(90deg, ${t.color}, ${t.color}44)`, borderRadius: 2, marginBottom: "0.2rem" }} />
                  {/* Opening quote mark */}
                  <p style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 300, fontSize: "2.2rem", lineHeight: 1, color: t.color, opacity: 0.25, marginBottom: "-0.6rem", userSelect: "none" }}>"</p>
                  <p style={{ fontSize: "0.85rem", lineHeight: 1.72, color: "#3a3a3a", fontStyle: "italic", flex: 1 }}>
                    "{t.quote}"
                  </p>
                  {/* Attribution */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", paddingTop: "0.8rem", borderTop: "1px solid #f0f0ea" }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg, ${t.color}dd, ${t.color}88)`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: "0.72rem", flexShrink: 0 }}>
                      {t.initial}
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: "0.78rem", color: "#1a1a1a", lineHeight: 1.2 }}>{t.name}</p>
                      <p style={{ fontSize: "0.7rem", color: t.color, fontWeight: 500 }}>{t.company}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
            {/* LinkedIn CTA card */}
            <FadeIn delay={0.52}>
              <div className="tcard" style={{ background: "linear-gradient(140deg, #2563EB 0%, #7C3AED 52%, #0891B2 100%)", border: "none", justifyContent: "center", alignItems: "center", textAlign: "center", minHeight: 220 }}>
                <style>{`
                  @keyframes thumbUp {
                    0%   { transform: translateY(0) rotate(0deg); }
                    20%  { transform: translateY(-6px) rotate(-8deg); }
                    40%  { transform: translateY(-10px) rotate(0deg); }
                    60%  { transform: translateY(-6px) rotate(6deg); }
                    80%  { transform: translateY(-2px) rotate(0deg); }
                    100% { transform: translateY(0) rotate(0deg); }
                  }
                  .thumb-icon { animation: thumbUp 2.2s ease-in-out infinite; display: inline-block; }
                `}</style>
                <div className="thumb-icon" style={{ marginBottom: "0.9rem" }}>
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 38V18M5 20H13M13 18C13 18 16 14 18 8C18 5 20 3 22 3C24 3 25 4.5 25 7C25 10 23 14 23 14H33C35.2 14 37 15.8 37 18C37 18.8 36.7 19.5 36.3 20.1C37.3 20.8 38 22 38 23.3C38 24.9 37 26.3 35.6 26.9C35.9 27.5 36 28.2 36 29C36 30.8 34.8 32.3 33.2 32.8C33.4 33.3 33.5 33.9 33.5 34.5C33.5 36.4 32 38 30 38H20C17.2 38 14.5 37.3 13 36V18" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="2" y="18" width="11" height="20" rx="2" stroke="white" strokeWidth="2.2" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 300, fontSize: "1.1rem", color: "white", lineHeight: 1.4, marginBottom: "0.5rem", fontStyle: "italic" }}>
                  More recommendations on LinkedIn
                </p>
                <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.6)", marginBottom: "1.3rem", fontWeight: 300 }}>
                  See the full picture
                </p>
                <a href="https://www.linkedin.com/in/jessica-d-1a30ba46/" target="_blank" rel="noreferrer"
                  style={{ display: "inline-block", padding: "0.6rem 1.4rem", background: "#ff3e3e", color: "white", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", borderRadius: 4, textDecoration: "none", transition: "background 0.2s, transform 0.15s" }}
                  onMouseEnter={e => { e.target.style.background = "#d42e2e"; e.target.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { e.target.style.background = "#ff3e3e"; e.target.style.transform = "translateY(0)"; }}>
                  View LinkedIn →
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" aria-label="Contact" style={{ padding: "7rem 2rem", background: "white", position: "relative", overflow: "hidden" }}>
        <div className="gem-ring" style={{ width: 420, height: 420, background: "#0891B2", bottom: -130, right: -90 }} />
        <div className="gem-ring" style={{ width: 300, height: 300, background: "#7C3AED", top: -50, left: "10%" }} />

        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <FadeIn>
            <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#0891B2", marginBottom: "0.7rem" }}>Get in Touch</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 300, fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)", lineHeight: 1.06, letterSpacing: "-0.015em", marginBottom: "1.1rem" }}>
              Let's build something<br /><em style={{ color: "#7C3AED" }}>worth using</em>
            </h2>
            <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "#555", fontWeight: 300, marginBottom: "3rem" }}>
              I'm passionate about making experiences better for people. I do my best work on complex products where design has a genuine seat at the table and collaboration is baked into the culture. If that sounds like your team, I'd love to hear from you.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem", alignItems: "center" }}>
              {[
                {
                  href: "mailto:jessdams@gmail.com",
                  label: "jessdams@gmail.com",
                  color: "#2563EB",
                  icon: <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>,
                },
                {
                  href: "https://www.linkedin.com/in/jessica-d-1a30ba46/",
                  label: "Connect on LinkedIn",
                  color: "#0891B2",
                  icon: <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>,
                },
              ].map((c, i) => (
                <a key={i} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                  className="contact-row"
                  style={{ border: `1.5px solid ${c.color}28`, background: `${c.color}07`, color: "#1a1a1a" }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${c.color}14`; e.currentTarget.style.borderColor = `${c.color}66`; e.currentTarget.style.color = c.color; }}
                  onMouseLeave={e => { e.currentTarget.style.background = `${c.color}07`; e.currentTarget.style.borderColor = `${c.color}28`; e.currentTarget.style.color = "#1a1a1a"; }}>
                  <span style={{ color: c.color, display: "flex", alignItems: "center", flexShrink: 0 }}>{c.icon}</span>
                  <span style={{ fontWeight: 400 }}>{c.label}</span>
                  <span style={{ marginLeft: "auto", opacity: 0.25 }}>→</span>
                </a>
              ))}

              {/* CV Download */}
              <div style={{ width: "100%", maxWidth: 420, marginTop: "0.4rem", paddingTop: "1.2rem", borderTop: "1px solid #eeeee8" }}>
                <p style={{ fontSize: "0.78rem", color: "#555", fontWeight: 600, marginBottom: "0.75rem", letterSpacing: "0.04em" }}>Prefer something to read offline?</p>
                <a href="/Jess_Dams_CV_2025.pdf" download="Jess_Dams_CV_2025.pdf"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#ff3e3e", color: "white", padding: "0.8rem 1.8rem", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", borderRadius: 4, textDecoration: "none", transition: "background 0.2s, transform 0.15s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#d42e2e"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#ff3e3e"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1v9M3.5 7l3.5 4 3.5-4M1 12.5h12" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Download CV
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      </main>
      {/* ── FOOTER ── */}
      <footer style={{
        background: "linear-gradient(140deg, #2563EB 0%, #7C3AED 52%, #0891B2 100%)",
        color: "rgba(255,255,255,0.75)",
        padding: "2.2rem",
        textAlign: "center",
        fontSize: "0.72rem",
        letterSpacing: "0.05em",
      }}>
        <p style={{ color: "rgba(255,255,255,0.9)" }}>© {new Date().getFullYear()} Jess Dams · Product Design Lead</p>
      </footer>

      {/* ── WORK PANEL ── rendered at root level so it overlays everything */}
      {activeStudy !== null && (
        <WorkPanel
          study={CASE_STUDIES[activeStudy]}
          total={CASE_STUDIES.length}
          onClose={() => setActiveStudy(null)}
          onPrev={() => setActiveStudy((activeStudy - 1 + CASE_STUDIES.length) % CASE_STUDIES.length)}
          onNext={() => setActiveStudy((activeStudy + 1) % CASE_STUDIES.length)}
        />
      )}
    </div>
  );
}
