import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Copy, Send } from "lucide-react";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";

const Contact = () => {
  return (
    <>
      <div className="container pb-24 pt-5 lg:max-w-[50%]">
        <Card>
          <CardHeader>
            <CardTitle>Contact</CardTitle>
            <CardDescription>
              Anyone with the link can view this document.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Input value="http://example.com/link/to/document" readOnly />
              <Button variant="secondary" className="shrink-0">
                <Copy className="mr-2 h-4 w-4" />
                Copy email
              </Button>
              <Button variant="secondary" className="shrink-0">
                <Send className="mr-2 h-4 w-4" />
                Send email
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Contact;
