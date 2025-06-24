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

import './SelectButton.scss';

export function SelectScrollable(props:object) {
  const {chartLabel, selectedTitle, dropdownOptions, width} = props;
  const buttonWidth = width ? width: '120px';
  const onDropdownChange = (value:string) => {
    const newIdx = dropdownOptions.indexOf(value);
    props.handleDropdownChange(chartLabel, newIdx);

  }

  return (
    <Select className="select-button" onValueChange={onDropdownChange}>
      <SelectTrigger className={`w-${buttonWidth} cursor-pointer select-trigger [&_svg[data-select-arrow]]:hidden border border-gray-400 bg-gray mr-5 text-black [&[data-placeholder]]:text-black `}>
        <SelectValue placeholder={selectedTitle}/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="select-group cursor-pointer">
          <SelectLabel >{chartLabel}</SelectLabel>
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
