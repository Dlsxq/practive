
import { ChangeEvent, KeyboardEvent, MutableRefObject, useLayoutEffect, useRef, useState } from "react";
import "./terminal.less";
import computeClass from "classnames";

interface TextProps {
  text: string;
  block?: boolean;
  inlineBlock?: boolean;
  profix?: string;
}

export function CommandText(props: TextProps) {

  const {
    text,
    block,
    inlineBlock,
    profix
  } = props;

  return <span data-profix={profix} className={computeClass({
    "command-view-text": true,
    "root-inline-block": block === undefined && inlineBlock,
    "root-block": block
  })} >{text}</span>;
}


export type OnInput = (info: { type: "push" | "delete", payload: string; }) => void;

interface ReadProps {
  defaultInput?: string;
  value?: string;
  onRead?: (info: string) => void;
  focus?: boolean;
  readonly?: boolean;
  onInput?: OnInput
  defineRef: MutableRefObject<HTMLInputElement>;
}


export function Read(props: ReadProps) {

  const {
    onRead,
    defaultInput,
    value,
    focus,
    readonly = false,
    onInput,
    defineRef
  } = props;

  const [ readVal, setReadVal ] = useState(value ?? "");

  useLayoutEffect(() => {
    !readonly && focus && defineRef.current.focus();
  }, [ focus ]);

  const monitorInputChange = (evl: ChangeEvent<HTMLInputElement>) => {
    let nextVal = evl.target.value;
    setReadVal(nextVal);
    onInput?.({ type: "push", payload: nextVal });
  };

  const onMonitorEnter = (evl: KeyboardEvent<HTMLInputElement>) => {
    
    if (evl.code === "Backspace") {
      onInput?.({ type: "delete", payload: null });
      return;
    }
    if (evl.code !== "Enter") {
      return;
    }
    onRead?.(readVal);
    defineRef.current.blur();
  };

  return <input
    ref={defineRef}
    onKeyDown={onMonitorEnter}
    className="command-read"
    type="text"
    defaultValue={defaultInput}
    value={value}
    onChange={monitorInputChange}
  />;
}


export function ReadCommandLink(props: Omit<TextProps & ReadProps & { onEnter?: (info: { label: string, value: string; }) => void; }, "defineRef">) {

  const {
    text,
    profix,
    focus,
    readonly,
    onEnter,
    value,
    defaultInput,
  } = props;

  const [ memoInput, setMemoInput ] = useState(value ?? ":");
  const [ readFocus, setReadFocus ] = useState(focus);

  const inputRef = useRef<HTMLInputElement>(null);

  const setInputFocus = () => {
    inputRef.current.focus();
  };
  
  const moniterReadEvent = (val: string) => {
    onEnter?.({ label: text, value: val });
  };

  const moniterInput :OnInput = ({ type, payload }) => {
    let nextVal = memoInput;

    if (type === "delete") {
      nextVal = nextVal.slice(0,nextVal.length - 1);
    } else if (type === "push") {
      nextVal = memoInput + payload.slice(payload.length - 1);
    }

    setMemoInput(nextVal);
  };

  return <div key={text} className="t-line-wrapper" onClick={setInputFocus} >
    <CommandText profix={profix} text={text + memoInput} />
    <Read
      focus={readFocus}
      defineRef={inputRef}
      readonly={readonly}
      value={""}
      onInput={moniterInput}
      defaultInput={defaultInput}
      onRead={moniterReadEvent}
    />
  </div>;
}