/**
 * Items for the "market students graduate into" masonry.
 *
 * These are the 19 pieces from the original landing page
 * (data/masonry.js), in the original order and with the original
 * thumbnails and heights. Cleaned up:
 *   - google.com/url and google.com/imgres redirect wrappers are unwrapped,
 *     so every link goes straight to the source;
 *   - YouTube items link to the video's watch URL;
 *   - the item that pointed at example.com (a placeholder) is shown
 *     without a link;
 *   - titles/sources were recovered from each article's own URL; videos,
 *     whose titles cannot be recovered from the data, are labelled
 *     "YouTube video" rather than guessed.
 *
 * Thumbnails are hot-linked from the publishers (as before). The component
 * loads them lazily with no referrer and falls back to a text card if a
 * publisher blocks or removes the image.
 */
export type MarketItem = {
  id: string;
  /** Original thumbnail URL. */
  image: string;
  /** Destination, or null when the original link was a placeholder. */
  url: string | null;
  /** Height from the original layout; rendered at half size, as before. */
  height: number;
  title: string;
  source: string;
  kind: "article" | "video";
  /** Topic for articles; videos are not tagged (titles unknown). */
  tag?: "Layoffs" | "Hiring" | "AI & jobs" | "Careers";
};

export const marketItems: MarketItem[] = [
  {
    id: "1",
    image:
      "https://strapi-cdn.indmoney.com/cdn-cgi/image/quality=80,format=auto,metadata=copyright,width=700/https://strapi-cdn.indmoney.com/xlarge_LAYOFF_BLOG_6e1767787f.png",
    url: "https://www.indmoney.com/blog/us-stocks/meta-google-salesforce-announce-layoffs-2025",
    height: 400,
    title: "Meta, Google and Salesforce announce layoffs",
    source: "INDmoney",
    kind: "article",
    tag: "Layoffs",
  },
  {
    id: "2",
    image:
      "https://media.licdn.com/dms/image/v2/D4D12AQGnkcHoR7kK0g/article-cover_image-shrink_720_1280/B4DZYm5O_UGwAI-/0/1744409260730?e=2147483647&v=beta&t=Z_xTvPFR7V4H_IXVnMfIgReQJ0PS9_NeCVec_Xzru_8",
    url: "https://www.linkedin.com/pulse/tech-job-market-2025-impact-artificial-intelligence-employment-habib-zyk7f",
    height: 280,
    title:
      "Tech job market 2025: the impact of artificial intelligence on employment",
    source: "LinkedIn",
    kind: "article",
    tag: "AI & jobs",
  },
  {
    id: "3",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr-bYqPfKyXKfunYBlWj-9ahxT2mz40F5lVQ&s",
    url: "https://www.linkedin.com/pulse/top-hiring-trends-india-2025-qureos-for-employers-cclhf",
    height: 600,
    title: "Top hiring trends in India, 2025",
    source: "LinkedIn",
    kind: "article",
    tag: "Hiring",
  },
  {
    id: "4",
    image:
      "https://blog.internshala.com/wp-content/uploads/2023/12/Most-Demanding-Jobs-in-India-1024x427.jpg",
    url: "https://blog.internshala.com/most-demanding-jobs-in-india/",
    height: 260,
    title: "Most in-demand jobs in India",
    source: "Internshala",
    kind: "article",
    tag: "Hiring",
  },
  {
    id: "5",
    image:
      "https://www.cloudhire.ai/wp-content/uploads/2025/01/Employment-Trends-2025.png",
    url: "https://www.cloudhire.ai/employment-trends-2025/",
    height: 230,
    title: "Employment trends 2025",
    source: "CloudHire",
    kind: "article",
    tag: "Hiring",
  },
  {
    id: "6",
    image:
      "https://static.toiimg.com/thumb/msid-121360366,width-1280,height-720,resizemode-4/121360366.jpg",
    url: "https://timesofindia.indiatimes.com/technology/tech-news/tech-layoffs-2025-over-61000-jobs-cut-as-microsoft-google-amazon-and-crowdstrike-reshape-workforce/articleshow/121359700.cms",
    height: 550,
    title:
      "Tech layoffs 2025: over 61,000 jobs cut as Microsoft, Google, Amazon and CrowdStrike reshape their workforce",
    source: "Times of India",
    kind: "article",
    tag: "Layoffs",
  },
  {
    id: "7",
    image:
      "https://thecsrjournal.in/wp-content/uploads/2025/05/unemployment.jpg",
    url: "https://www.linkedin.com/pulse/looking-land-your-dream-job-2025-heres-how-get-started-spherion-qixfe",
    height: 720,
    title: "Looking to land your dream job in 2025? Here's how to get started",
    source: "LinkedIn",
    kind: "article",
    tag: "Careers",
  },
  {
    id: "8",
    image:
      "https://etradeforall.org/sites/etradeforall/files/styles/wide/public/news/WEF-The-Future-of-Jobs-Report-2023-eT4a-Resume.webp?itok=xJyEPdLG",
    url: "https://www.winssolutions.org/wef-future-of-jobs-report-2025-explained/",
    height: 200,
    title: "WEF Future of Jobs Report 2025, explained",
    source: "WINS Solutions",
    kind: "article",
    tag: "AI & jobs",
  },
  {
    id: "9",
    image: "https://i.ytimg.com/vi/JlnN6LCo8k0/maxresdefault.jpg",
    url: "https://www.igauge.in/blogs/freelancing-as-a-student-how-to-start-freelancing-while-still-in-college",
    height: 350,
    title: "Freelancing as a student: how to start while still in college",
    source: "iGauge",
    kind: "article",
    tag: "Careers",
  },
  {
    id: "10",
    image: "https://i.ytimg.com/vi/7t5lJH_rKvM/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=ObNvmFt_Ouk",
    height: 300,
    title: "YouTube video",
    source: "YouTube",
    kind: "video",
  },
  {
    id: "11",
    image:
      "https://www.studyiq.com/articles/wp-content/uploads/2022/11/29194957/Unemployment-Rate-in-India.jpg",
    url: "https://www.studyiq.com/articles/unemployment-rate-in-india/",
    height: 350,
    title: "Unemployment rate in India",
    source: "StudyIQ",
    kind: "article",
    tag: "Careers",
  },
  {
    id: "12",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT3ulCBsNMOyv4DhaXihRyhg_hdqEkJkiyHA&s",
    url: "https://www.hrkatha.com/news/delhi-job-market-grows-by-52420-while-bangalores-drops-by-41208/",
    height: 340,
    title: "Delhi job market grows by 52,420 while Bangalore's drops by 41,208",
    source: "HR Katha",
    kind: "article",
    tag: "Hiring",
  },
  {
    id: "13",
    image:
      "https://myexeed.com/wp-content/uploads/2024/09/THE-IMPACT-OF-AI-ON-EMPLOYMENT.jpg",
    url: "https://www.exin.com/article/the-impact-of-ai-on-the-future-job-market-understanding-the-changes/",
    height: 420,
    title:
      "The impact of AI on the future job market: understanding the changes",
    source: "EXIN",
    kind: "article",
    tag: "AI & jobs",
  },
  {
    id: "14",
    image:
      "https://images.moneycontrol.com/static-mcnews/2023/01/2023-Tech-layoffs-continue-240123.jpg",
    // The original pointed at https://example.com/fourteen (a placeholder).
    url: null,
    height: 290,
    title: "2023 tech layoffs continue",
    source: "Moneycontrol",
    kind: "article",
    tag: "Layoffs",
  },
  {
    id: "15",
    image:
      "https://cdn.statcdn.com/Infographic/images/normal/29421.jpeg?grayscale",
    url: "https://www.statista.com/chart/29421/number-of-workers-laid-off-worldwide-in-the-tech-startup-sector-since-jan-2022/",
    height: 400,
    title:
      "Number of workers laid off worldwide in the tech and startup sector since January 2022",
    source: "Statista",
    kind: "article",
    tag: "Layoffs",
  },
  {
    id: "16",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqAcrObT1H1c7LHIjWqoAq1nx2N2Fwb3e2waPHJpzRNmHOGpX3Ic43kPmRUhmKpPZgHAM&usqp=CAU",
    url: "https://www.youtube.com/watch?v=yldrjxQvYjk",
    height: 350,
    title: "YouTube video",
    source: "YouTube",
    kind: "video",
  },
  {
    id: "17",
    image:
      "https://akm-img-a-in.tosshub.com/indiatoday/styles/medium_crop_simple/public/2023-02/budget-crash-a.jpg?VersionId=qWz8iPlDHvgFOzcxbuEgoMX_7puzo7.z&size=750:*",
    url: "https://www.indiatoday.in/magazine/cover-story/story/20230213-system-crash-massive-layoff-wave-in-global-tech-industry-2330169-2023-02-03",
    height: 420,
    title: "System crash: a massive layoff wave in the global tech industry",
    source: "India Today",
    kind: "article",
    tag: "Layoffs",
  },
  {
    id: "18",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxcEcty7Vu0muk3ZgSbz6wQWiTL3shXs5_GpEV89sfoNKWA9JMHHcmeCifv4eg-z3_FKM&usqp=CAU",
    url: "https://www.youtube.com/watch?v=vsSodO46NPY",
    height: 300,
    title: "YouTube video",
    source: "YouTube",
    kind: "video",
  },
  {
    id: "19",
    image:
      "https://i.ytimg.com/vi/asidIeipS40/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD8TpN-7AgIP3fGXQ8U_-hTZwcYGQ",
    url: "https://www.youtube.com/watch?v=asidIeipS40",
    height: 300,
    title: "YouTube video",
    source: "YouTube",
    kind: "video",
  },
];
