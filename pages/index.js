import Head from "next/head";
import Image from "next/image";
import aelogo from "../assets/aeternity-ae-logo.svg";
import { useEffect } from "react";
import Chat from "./components/Chat";
import AOS from "aos";
import "aos/dist/aos.css";
import { AiFillGithub } from "react-icons/ai";

const Home = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const getReply = async (ques) => {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usrInput: ques }),
    });

    const data = await response.json();
    if (data.output) {
      return data.output;
    }
    return data.error;
  };

  return (
    <div className="root">
      <Head 
        title="Æternity Chatbot"
        description="Æternity Chatbot"
        keywords="Æternity, Chatbot, Æternity Chatbot"
      />
      <Chat getReply={getReply} />

      <div className="badge-container grow">
        <a
          href="https://docs.aeternity.com/"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={aelogo} alt="Aeternity Logo" />
            <p>Æternity Docs</p>
          </div>
        </a>
      </div>

      <div className="badge-container1 grow">
        <a
          href="https://github.com/SudhansuuRanjan/aeternity-chat/"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <AiFillGithub size={20} className="git-icon" />
            <p>Github</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
