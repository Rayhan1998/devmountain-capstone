import React, { useContext } from "react";
import { Heading, Button } from "@chakra-ui/react";

import { useParams, Link } from "react-router-dom";
import ThreadCreatorForm from "../../components/threadCreatorModal/threadCreatorForm.component";
import { Context } from "../../Context";
export default function ThreadCreatorPage() {
  const { isLoggedIn, setIsLoggedIn, setUserData, userData, setSavedRecipes } =
    useContext(Context);

  return (
    <div>
      <section>
        <ThreadCreatorForm />
      </section>
    </div>
  );
}
