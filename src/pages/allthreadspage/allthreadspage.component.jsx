import React, { useEffect, useState } from "react";
import "./allthreadspage.styles.css";
import Navbar from "../../components/navbar/navbar.component";
import ThreadBox from "../../components/threadbox/threadbox.component";

import { Button, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { date } from "yup/lib/locale";

export default function AllThreadsPage() {
  const [allThreads, setAllThreads] = useState();

  useEffect(() => {
    axios.get(`http://localhost:4000/allthreads`).then((res) => {
      setAllThreads(res.data);
    });
    console.log("useeffect");
  }, []);

  console.log(allThreads);

  return (
    <div className="all-thread-page">
      <Navbar />
      <section className="upper-section">
        <Heading>All threads</Heading>
        <Button colorScheme="blue">
          <Link to="/threadCreatorPage">Create a thread</Link>
        </Button>
      </section>

      <section className="threads-section">
        {allThreads
          ? allThreads.map((thread) => {
              return (
                <ThreadBox
                  key={thread.id}
                  title={thread.thread_title}
                  thread_creator={thread.user_name}
                  date={new Date(thread.created_at).toLocaleString()}
                  comments={
                    thread.thread_comment_amount > 0
                      ? thread.thread_comment_amount
                      : 0
                  }
                  likes={thread.thread_upvotes ? thread.thread_upvotes : 0}
                  dislikes={
                    thread.thread_downvotes ? thread.thread_downvotes : 0
                  }
                  id={thread.id}
                />
              );
            })
          : null}
      </section>
    </div>
  );
}
