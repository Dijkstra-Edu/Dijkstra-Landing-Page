/**
 * Headlines for the "market students graduate into" section.
 *
 * Replaces data/masonry.js, which hot-linked 19 third-party thumbnails (some
 * through google.com/url redirect wrappers, one to example.com). Titles are
 * taken from each article's own URL; links go straight to the source.
 * Entries without a recoverable title (bare video links) were dropped.
 */
export type Headline = {
  title: string;
  source: string;
  url: string;
  tag: "Layoffs" | "Hiring" | "AI & jobs" | "Careers";
};

export const headlines: Headline[] = [
  {
    title:
      "Tech layoffs 2025: over 61,000 jobs cut as Microsoft, Google, Amazon and CrowdStrike reshape their workforce",
    source: "Times of India",
    url: "https://timesofindia.indiatimes.com/technology/tech-news/tech-layoffs-2025-over-61000-jobs-cut-as-microsoft-google-amazon-and-crowdstrike-reshape-workforce/articleshow/121359700.cms",
    tag: "Layoffs",
  },
  {
    title:
      "Tech job market 2025: the impact of artificial intelligence on employment",
    source: "LinkedIn",
    url: "https://www.linkedin.com/pulse/tech-job-market-2025-impact-artificial-intelligence-employment-habib-zyk7f",
    tag: "AI & jobs",
  },
  {
    title: "Top hiring trends in India, 2025",
    source: "LinkedIn",
    url: "https://www.linkedin.com/pulse/top-hiring-trends-india-2025-qureos-for-employers-cclhf",
    tag: "Hiring",
  },
  {
    title: "Meta, Google and Salesforce announce layoffs",
    source: "INDmoney",
    url: "https://www.indmoney.com/blog/us-stocks/meta-google-salesforce-announce-layoffs-2025",
    tag: "Layoffs",
  },
  {
    title:
      "The impact of AI on the future job market: understanding the changes",
    source: "EXIN",
    url: "https://www.exin.com/article/the-impact-of-ai-on-the-future-job-market-understanding-the-changes/",
    tag: "AI & jobs",
  },
  {
    title: "Most in-demand jobs in India",
    source: "Internshala",
    url: "https://blog.internshala.com/most-demanding-jobs-in-india/",
    tag: "Hiring",
  },
  {
    title: "System crash: a massive layoff wave in the global tech industry",
    source: "India Today",
    url: "https://www.indiatoday.in/magazine/cover-story/story/20230213-system-crash-massive-layoff-wave-in-global-tech-industry-2330169-2023-02-03",
    tag: "Layoffs",
  },
  {
    title: "WEF Future of Jobs Report 2025, explained",
    source: "WINS Solutions",
    url: "https://www.winssolutions.org/wef-future-of-jobs-report-2025-explained/",
    tag: "AI & jobs",
  },
  {
    title: "Employment trends 2025",
    source: "CloudHire",
    url: "https://www.cloudhire.ai/employment-trends-2025/",
    tag: "Hiring",
  },
  {
    title:
      "Number of workers laid off worldwide in the tech and startup sector since January 2022",
    source: "Statista",
    url: "https://www.statista.com/chart/29421/number-of-workers-laid-off-worldwide-in-the-tech-startup-sector-since-jan-2022/",
    tag: "Layoffs",
  },
  {
    title: "Unemployment rate in India",
    source: "StudyIQ",
    url: "https://www.studyiq.com/articles/unemployment-rate-in-india/",
    tag: "Careers",
  },
  {
    title: "Looking to land your dream job in 2025? Here's how to get started",
    source: "LinkedIn",
    url: "https://www.linkedin.com/pulse/looking-land-your-dream-job-2025-heres-how-get-started-spherion-qixfe",
    tag: "Careers",
  },
  {
    title: "Delhi job market grows by 52,420 while Bangalore's drops by 41,208",
    source: "HR Katha",
    url: "https://www.hrkatha.com/news/delhi-job-market-grows-by-52420-while-bangalores-drops-by-41208/",
    tag: "Hiring",
  },
  {
    title: "Freelancing as a student: how to start while still in college",
    source: "iGauge",
    url: "https://www.igauge.in/blogs/freelancing-as-a-student-how-to-start-freelancing-while-still-in-college",
    tag: "Careers",
  },
];
