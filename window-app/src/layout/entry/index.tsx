import { FC,useState } from "react";
import computeClass from "classnames";
import "./entry.less";
import Terminal, { CommandProp } from "~/components/terminal";
import { useNavigate } from "react-router-dom";
import { setLogin } from "~/store/entry";
// import img from "./entryImage.jpg";




const defaultRead = [
  {
    awaitRead: {
      readLabel: "username"
    }
  },
  {
    awaitRead: {
      readLabel: "password"
    }
  }
] as CommandProp[];



/* 
 1. 设置背景图片
 2. 背景动画
 3. terminal
*/
let rowIndex = 1, password = 1;


interface IProps {

}

const Entry: FC<IProps> = (props) => {

  const {

  } = props;

  const [ commandList, setCommantList ] = useState<CommandProp[]>(defaultRead.slice(0, rowIndex));
  const [ loading, setLoading ] = useState(false);
  const navigate = useNavigate();

  const moniterReadEnter = (info) => {
    let nextList = [] as CommandProp[];
    
    if (rowIndex === password) {
      let read = defaultRead[rowIndex];
      read.awaitRead.focus = true;
      nextList = nextList.concat(read);
    } else {

      nextList.push({
        bindCommandOfResolver: [
          {
            label: "loading..."
          }
        ]
      });

      // 确定登录
      setLogin();

      let timeId = setTimeout(() => {
        setLoading(true);
        let intoPlatform = setTimeout(() => {
          clearTimeout(intoPlatform);
          clearTimeout(timeId);
          navigate(-1);
        }, 2000);
      }, 1500);
    }

    setCommantList(olv => {
      return olv.map(el => {
        if (el.awaitRead?.readLabel === info.label) {
          el.awaitRead.value = info.value;
        }
        return el;
      }).concat(nextList);
    });

    rowIndex++;
  };


  return (
    <section className={computeClass(
      "full-container",
      "profile-container"
    )}>
      <div className={computeClass(
        "container-entry-background",
        !loading && "container-wrapper-image"
      )}>
        <div className={computeClass(
          "left",
          "common",
          {
            "transform-left": loading
          }
        )}></div>
        <div className={computeClass(
          "right",
          "common",
          {
            "transform-right": loading
          }
        )}></div>
        <div className={computeClass({
          "entry-text": true,
          "hidden": true,
          "show-text": loading
        })}  >
          你好~
        </div>
      </div>
      {/* <button onClick={() => setLoading(v => !v)}>Transform</button> */}
      <div className={computeClass("terminl-container-bottom", loading && "hidden")}>
        <p className="text">
          关于我，关于我，关于我，关于我，关于我，关于我，关于我，
          我是你没有血缘关系的亲爸爸
        </p>
        {/* <p className="text">援助我,援助我 ,援助我援助我,援助我 ,
          援助我,援助我 ,援助我
          援助我援助我,援助我 ,援助我援助我,援助我 ,援助我援助我,援助我 ,援助我
          援助我,援助我 ,援助我援助我,援助我 ,援助我</p>
        <p className="text">github </p>
        <p className="text">关于我，关于我，关于我，关于我，关于我，关于我，关于我，
          关于我，关于我，关于我，
          关于我，关于我，
          关于我，关于我，</p>
        <p className="text">援助我,援助我 ,援助我援助我,援助我 ,
          援助我,援助我 ,援助我
          援助我援助我,援助我 ,援助我援助我,援助我 ,援助我援助我,援助我 ,援助我
          援助我,援助我 ,援助我援助我,援助我 ,援助我</p>
        <p className="text">github </p>
        <p className="text">关于我，关于我，关于我，关于我，关于我，关于我，关于我，
          关于我，关于我，关于我，
          关于我，关于我，
          关于我，关于我，</p>
        <p className="text">援助我,援助我 ,援助我援助我,援助我 ,
          援助我,援助我 ,援助我
          援助我援助我,援助我 ,援助我援助我,援助我 ,援助我援助我,援助我 ,援助我
          援助我,援助我 ,援助我援助我,援助我 ,援助我</p>
        <p className="text">github </p>
        <p className="text">关于我，关于我，关于我，关于我，关于我，关于我，关于我，
          关于我，关于我，关于我，
          关于我，关于我，
          关于我，关于我，</p>
        <p className="text">援助我,援助我 ,援助我援助我,援助我 ,
          援助我,援助我 ,援助我
          援助我援助我,援助我 ,援助我援助我,援助我 ,援助我援助我,援助我 ,援助我
          援助我,援助我 ,援助我援助我,援助我 ,援助我</p>
        <p className="text">github 1123</p> */}
        <Terminal commandList={commandList} onEnter={moniterReadEnter} key="1123" />

      </div>
    </section>
  );
};


export default Entry;