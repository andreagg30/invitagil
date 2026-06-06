/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/refs */
import {
  useInteractions,
  useListItem,
  FloatingFocusManager,
  FloatingList,
} from "@floating-ui/react";
import * as React from "react";
import type { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { cn } from "../utils/cn";
import { isString } from "lodash";
import Icon from "./Icon";
import useDropdown, {
  type DropdownOption,
  type HandleSelect,
  type OnChange,
  type OptionsList,
} from "../hooks/useDropdown";

interface DropdownProps {
  value: DropdownOption | null;
  options: OptionsList;
  onChange: OnChange;
  label?: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}

interface SelectContextValue {
  activeIndex: number | null;
  selectedIndex: number | null;
  getItemProps: ReturnType<typeof useInteractions>["getItemProps"];
  handleSelect: HandleSelect;
}

const SelectContext = React.createContext<SelectContextValue>(
  {} as SelectContextValue,
);

function Select({
  children,
  value,
  onChange,
  error,
}: {
  children: React.ReactNode;
  value: DropdownOption | null;
  onChange: HandleSelect;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}) {
  const {
    getReferenceProps,
    refs,
    isOpen,
    selectContext,
    context,
    floatingStyles,
    getFloatingProps,
    elementsRef,
    labelsRef,
  } = useDropdown({ onChange });
  return (
    <>
      <div
        className={cn(
          "px-4 transition-all placeholder:text-soft-gray cursor-pointer ring-none min-h-10 outline-2 outline-perry hover:bg-mint/20 flex gap-3 items-center rounded-md focus:ring-none focus:outline-4",
          {
            "outline-red-500 bg-red-100 hover:bg-red-100": error,
            "hover:outline-perry": !error,
          },
        )}
        ref={refs.setReference}
        tabIndex={0}
        {...getReferenceProps()}
      >
        <div className="flex-1">{value?.label ?? "Select..."}</div>
        <Icon
          icon="keyboard_arrow_down"
          className={cn("transition-all", {
            "rotate-180": isOpen,
          })}
        />
      </div>
      <SelectContext.Provider value={selectContext}>
        {isOpen && (
          <FloatingFocusManager context={context} modal={false}>
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              className="bg-white border-2 flex flex-col border-aqua shadow rounded-lg p-2 mt-1 z-10 focus:outline-none"
              {...getFloatingProps()}
            >
              <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
                {children}
              </FloatingList>
            </div>
          </FloatingFocusManager>
        )}
      </SelectContext.Provider>
    </>
  );
}

function Option({ option }: { option: DropdownOption }) {
  const { activeIndex, selectedIndex, getItemProps, handleSelect } =
    React.useContext(SelectContext);

  const { ref, index } = useListItem({ label: option.label });

  const isActive = activeIndex === index;
  const isSelected = selectedIndex === index;

  return (
    <button
      ref={ref}
      role="option"
      aria-selected={isActive && isSelected}
      tabIndex={isActive ? 0 : -1}
      className={cn(
        "text-left cursor-pointer px-4 py-2 rounded-md hover:bg-mint/20 focus:bg-mint/20 focus:outline-none",
        {
          "bg-perry/50": isActive,
          "font-bold": isSelected,
        },
      )}
      {...getItemProps({
        onClick: () => handleSelect(index),
      })}
    >
      {option.label}
    </button>
  );
}

export default function Dropdown({
  value,
  options,
  onChange,
  label,
  error,
}: DropdownProps) {
  return (
    <div className="flex flex-col">
      {label && (
        <label
          className={cn(
            "ml-2 z-10 px-2 text-white bg-perry whitespace-nowrap w-min rounded-t-sm rouded-b-sm text-base font-medium",
            {
              "bg-red-500": error,
            },
          )}
        >
          {label}
        </label>
      )}
      <Select
        value={value}
        error={error}
        onChange={(index) => {
          if (index === null) return;
          onChange(options[index]);
        }}
      >
        {options.map((option, i) => (
          <Option key={i} option={option} />
        ))}
      </Select>
      {isString(error?.message) && (
        <span className="mt-1 text-sm text-red-500">{error?.message}</span>
      )}
    </div>
  );
}
