import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown } from "lucide-react";

import './SelectButton.scss';

export function SelectScrollable() {
  return (
    <Select className="select-button">
      <SelectTrigger className="w-[100px] cursor-pointer select-trigger [&_svg[data-select-arrow]]:hidden border border-violet-400 bg-violet-400 mr-5 text-white [&[data-placeholder]]:text-white ">
        <SelectValue placeholder="Total"/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel >Purchase</SelectLabel>
          <SelectItem value="total">Total</SelectItem>
          <SelectItem value="mean">Mean</SelectItem>
          <SelectItem value="top-5">Top 5</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
