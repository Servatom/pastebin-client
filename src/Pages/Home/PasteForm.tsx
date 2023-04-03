import { useContext, useState } from "react";
import { Select, Input, Switch, FormControl } from "@chakra-ui/react";

import FormItem from "../../Components/FormItem";
import postHandler from "../../Routes/postRoute";
import { bodyContext } from "../../Contexts/BodyContext";
import { syntaxContext } from "../../Contexts/SyntaxContext";
import SubmitButton from "../../Components/Button";
import Loading from "../../Components/Loading";

function PasteForm() {
  const body = useContext(bodyContext).body;
  const syntax = useContext(syntaxContext);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("Untitled");
  const [expiresAt, setExpiresAt] = useState("1d");

  const SubmitButtonHandler = async () => {
    setIsLoading(true);
    console.log(expiresAt);
    const url = await postHandler({
      title: title,
      body: body,
      password: password,
      syntax: syntax.syntax,
      expiresAt: expiresAt,
    });
    setIsLoading(false);
    await new Promise((r) => setTimeout(r, 100));
    const error_element = document.getElementById("paste-url")!;
    if (url.status === 201) {
      error_element.style.color = "green";
      error_element.innerHTML = "Paste Created: " + url.data.url;
    } else {
      console.log(url);
      error_element.innerHTML = "Body must not be empty!";
      error_element.style.color = "red";
    }
  };

  return (
    <div className="pt-4">
      <h1 className="pb-1 border-black border-b-2 font-bold">Paste Settings</h1>
      <div className="flex flex-col pt-3">
        <FormItem label="Syntax Highlighting">
          <Switch
            className="mx-2"
            defaultChecked={false}
            onChange={() => syntax.setisHighlighted(!syntax.isHighlighted)}
          />
        </FormItem>

        <FormItem label="Syntax">
          <Select
            defaultValue={syntax.syntax}
            onChange={(e) => syntax.setSyntax(e.target.value)}
          >
            <option value="text">Text</option>
            <option value="javascript">JavaScript</option>
            <option value="css">CSS</option>
            <option value="html">HTML</option>
          </Select>
        </FormItem>

        <FormItem label="Expires In" id="expiry-select">
          <FormControl>
            <Select
              defaultValue={"1d"}
              onChange={(e) => setExpiresAt(e.target.value)}
            >
              <option value="0">Burn On Read</option>
              <option value="10m">10 Minutes</option>
              <option value="1h">1 Hour</option>
              <option value="6h">6 Hours</option>
              <option value="1d">1 Day</option>
              <option value="1w">1 Week</option>
              <option value="1M">1 Month</option>
            </Select>
          </FormControl>
        </FormItem>

        <FormItem label="Password">
          <Input
            placeholder="Enter password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormItem>

        <FormItem label="Paste Name/ Title">
          <Input
            placeholder="Default Untitled"
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormItem>
        <SubmitButton
          className="w-[10em] py-5 my-5"
          onClick={SubmitButtonHandler}
        >
          Create New Paste
        </SubmitButton>
        <Loading isLoading={isLoading}>
          <div id="paste-url"></div>
        </Loading>
      </div>
    </div>
  );
}

export default PasteForm;
