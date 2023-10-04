import { informationService } from "@/services/information.service";
import { InformationData } from "@/types/information-schema";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const UpdateInformation = () => {
  const [information, setInformation] = useState<InformationData>({
    name: "",
  });

  const updateData = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await informationService.update(information);
      console.log("fatto");
      console.log(informationService.get());
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold">Update information</h1>
      <form onSubmit={updateData}>
        <div className="mb-2">
          <Label>Title</Label>
          <Input
            type="text"
            placeholder="title"
            value={information.name}
            onChange={(e) => {
              setInformation({ ...information, name: e.target.value });
            }}
          />
        </div>
        <Button type="submit" className="mt-3 w-full">
          Button
        </Button>
      </form>
    </>
  );
};

export default UpdateInformation;
