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

export function SelectScrollable(props:object) {
  const {data, column} = props;
  const dropdownOptions = data.map(d=>d['kpi_name']);
  console.log(dropdownOptions)
  const onDropdownChange = (value:string, key:number) => {
    const newIdx = dropdownOptions.indexOf(value);
    props.handleDropdownChange(column, newIdx);

  }

  return (
    <Select className="select-button" onValueChange={onDropdownChange}>
      <SelectTrigger className="w-[120px] cursor-pointer select-trigger [&_svg[data-select-arrow]]:hidden border border-gray-400 bg-gray mr-5 text-black [&[data-placeholder]]:text-black ">
        <SelectValue placeholder={dropdownOptions[0]}/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="select-group cursor-pointer">
          <SelectLabel >{column}</SelectLabel>
          <div className="select-item">
            {
              dropdownOptions.map( (option, idx) => (
                <SelectItem key={idx} value={option}>{option}</SelectItem>
              ))
            }
          </div>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
