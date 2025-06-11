import React from "react";

interface Project {
  title: string;
  description: string;
  link: string;
}

const projects: Project[] = [
  {
    title: "TCA Hendrix Chess",
    description: "A React chess app with move history and turn tracking.",
    link: "https://main.d1hzupo3dbxzs3.amplifyapp.com/tca-hendrix-chess/",
  },
  {
    title: "ClimbHub",
    description: "A social platform for climbers to share routes and tips.",
    link: "#",
  },
  {
    title: "CookBookAI",
    description: "A recipe generator web app using GPT APIs.",
    link: "#",
  },
];

const PortfolioPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="text-center py-10 bg-white shadow">
        <h1 className="text-4xl font-bold">Hendrix Gullixson</h1>
        <p className="text-lg text-gray-600">Frontend Developer</p>
      </header>

      <section className="py-10 px-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">My Projects</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-5 rounded-xl shadow hover:shadow-lg transition bg-white"
            >
              <h3 className="text-xl font-bold">{project.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{project.description}</p>
            </a>
          ))}
        </div>
      </section>

      <footer className="py-6 text-center bg-white border-t">
        <p>
          Contact me at:{" "}
          <a href="mailto:your.email@example.com" className="text-blue-600">
            your.email@example.com
          </a>
        </p>
        <p className="text-sm text-gray-500 mt-2">
          © {new Date().getFullYear()} Hendrix Gullixson
        </p>
      </footer>
    </div>
  );
};

export default PortfolioPage;
