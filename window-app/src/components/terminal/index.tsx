import { FC, Fragment, useMemo } from "react";
import "./terminal.less";
import computeClass from "classnames";
import { CommandText,  ReadCommandLink } from "./ReadCommand";


/* 
  $ admint@root/
    username
*/

export type CommandOfResolver = {
  color?: string;
  label: string;
};

export interface CommandProp {
  // command: string;
  bindCommandOfResolver?: CommandOfResolver[];

  profix?: string;
  fileStreamPath?: string;

  awaitRead?: {
    readLabel: string;
    value?: string;
    readonly?: boolean;
    focus?: boolean;
    defaultInput?: string;
  };

}

interface IProps {
  commandList?: CommandProp[];
  onEnter?: (info: { label: string, value: string; }) => void;
}


/**
 * 
 * @param props IProps
 * @returns ReactNode
 * 
 * 1. 获取当前的命令
 * 2. 监听输入
 * 3. 触发entenr 发射
 */
const Terminal: FC<IProps> = (props) => {

  const {
    commandList,
    onEnter
  } = props;


  const commandViewNode = useMemo(() => {
    let resultNode = [];

    for (let i = 0, len = commandList.length;i < len;i++) {
      let {
        fileStreamPath,
        profix = "$",
        awaitRead,
        bindCommandOfResolver
      } = commandList[i];

      if (typeof fileStreamPath === "string") {
        resultNode.push(
          // key可能会重复
          <CommandText profix={profix} key={fileStreamPath} block={true} text={fileStreamPath} />
        );
        continue;
      }

      if (Array.isArray(bindCommandOfResolver)) {

        bindCommandOfResolver.reduce((nodeList, pos) => {
          nodeList.push(
            <CommandText profix={""} key={pos.label} block={true} text={pos.label} />
          );
          return nodeList;
        },resultNode);

        continue;
      }

      if (typeof awaitRead === "object") {
        const { focus, value, defaultInput, readLabel, readonly } = awaitRead;
        // key 可能会重复
        resultNode.push(
          <ReadCommandLink
            onEnter={onEnter}
            key={readLabel}
            text={readLabel}
            profix={profix}
            value={value}
            defaultInput={defaultInput}
            readonly={readonly}
            focus={focus}
          />
        );
      }
    }

    return resultNode;
  }, [ commandList, onEnter ]);

  return (
    <article className={computeClass("terminal-views")} >
      {commandViewNode}
    </article>
  );
};


export default Terminal;