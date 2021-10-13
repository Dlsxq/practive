import React from 'react';
// import { notification } from '@whale-labs/want';
// import moment, { Moment } from 'moment';



type Props = {
  width: number;
  height: number;
  date: Date;
  time: string;
  onChangeTime: (v: any) => void;
  setLive?: (v: any) => void;
  live?: boolean;
  setPxValue?: (v: any) => void;
  marginWidth: number
  disable?: boolean
};

type State = {
  isDraggingforMoving: boolean;
  selectForMoving: { x: number; y: number };
  currentPos: Array<any>;
  current: string;
  isCurrentDate: boolean;
  width: number;
  isInCanvas: boolean;
  gap: number;
};

class TimeLine extends React.Component<Props, State> {
  private canvas: any;
  private ctx: any;
  private top: number;
  private haftTop: number;
  private x: number
  constructor(props: Props) {
    super(props);
    this.canvas = React.createRef();
    this.top = 8;
    this.haftTop = 4;
    this.x = (props.marginWidth / 2) + 20
    this.state = {
      isDraggingforMoving: false,
      selectForMoving: { x: this.x, y: this.haftTop },
      current: props.time, // 1611114071000,
      currentPos: [
        [this.x - 4, this.top - this.haftTop],
        [this.x + 4, this.top - this.haftTop],
        [this.x + 4, props.height - this.haftTop],
        [this.x - 4, props.height - this.haftTop],
      ],
      gap: (props.width - props.marginWidth - 40) / (4 * 24),
      isCurrentDate: moment().isSame(props.date, 'd'),
      width: props.width - props.marginWidth,
      isInCanvas: false
    };
  }

  componentDidMount() {
    const { width } = this.state;
    if (this.canvas) {
      this.ctx = this.canvas.current.getContext('2d');
      this.drawRoundRect(this.props.marginWidth / 2, this.top, width, 56, 4, 'rgba(116, 190, 240, 0.15)');
      this.drawBg();
      this.getPosition()
    }
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.date !== this.props.date || nextProps.time !== this.state.current) {
      this.setState(
        {
          isCurrentDate: moment().isSame(nextProps.date, 'd'),
          current: nextProps.time,
        },
        () => {
          this.resetDraw(this.state.isInCanvas);
        },
      );
    }
    if (nextProps.width !== this.state.width) {
      this.setState({
        width: nextProps.width - this.props.marginWidth,
        gap: (nextProps.width - this.props.marginWidth - 40) / (4 * 24),
      }, () => {
        this.resetDraw(this.state.isInCanvas);
      })
    }
  }

  drawBg = () => {
    const { gap } = this.state
    const data = [];
    for (let i = 0; i <= 4 * 24; i++) {
      const obj = {
        x: gap * i + this.x,
        len: 6,
      };
      let time = i / 4;
      if (i % 8 === 0) {
        obj.len = 20;
        const timestamp = time < 10 ? `0${time}:00` : `${time}:00`;
        const textObj = {
          x: gap * i + this.x,
          y: 30 + this.top,
          time: timestamp,
        };
        this.drawTime(textObj);
      } else if (i % 8 === 4) {
        obj.len = 14;
      }
      data.push(obj);
      this.drawLine(obj);
    }
  };

  getPosition = (draw?: boolean) => {
    const { current, gap } = this.state;
    const { height, disable } = this.props;
    const currentTime: any = current.split(':') || [0, 0, 0];
    const x = (currentTime[0] * 4 + currentTime[1] / 15) * gap + this.x;
    !disable && this.drawLine(
      {
        x,
        len: 60,
      },
      '#74BEF0',
      4,
      this.top - this.haftTop,
    );
    this.setState({
      currentPos: [
        [x, this.haftTop],
        [x + 4, this.haftTop],
        [x + 4, height - this.haftTop],
        [x, height - this.haftTop],
      ],
    }, () => {
      !disable && draw && this.drawTimePosition()
    });

    this.drawRoundRect(this.props.marginWidth / 2, this.top, x - this.props.marginWidth / 2, 56, 4, 'rgba(116, 190, 240, 0.35)');
  };



  drawTimePosition = () => {
    const { currentPos, current } = this.state;
    this.drawRoundRect(currentPos[0][0] - 40, 0, 80, 28, 14, '#74BEF0');
    const textObj = {
      x: currentPos[0][0],
      y: 16,
      time: current,
    };
    this.drawTime(textObj, 'white');
  };

  drawRoundRect = (
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
    color: string,
  ) => {
    if (w < 2 * r) { r = w / 2; }
    if (h < 2 * r) { r = h / 2; }
    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.moveTo(x + r, y);
    this.ctx.arcTo(x + w, y, x + w, y + h, r);
    this.ctx.arcTo(x + w, y + h, x, y + h, r);
    this.ctx.arcTo(x, y + h, x, y, r);
    this.ctx.arcTo(x, y, x + w, y, r);
    this.ctx.closePath();
    this.ctx.fill();
  };

  drawRoundRectPath(width: number, height: number, radius: number) {
    this.ctx.beginPath(0);
    //从右下角顺时针绘制，弧度从0到1/2PI
    this.ctx.arc(width - radius, height - radius, radius, 0, Math.PI / 2);

    //矩形下边线
    this.ctx.lineTo(radius, height);

    //左下角圆弧，弧度从1/2PI到PI
    this.ctx.arc(radius, height - radius, radius, Math.PI / 2, Math.PI);

    //矩形左边线
    this.ctx.lineTo(0, radius);

    //左上角圆弧，弧度从PI到3/2PI
    this.ctx.arc(radius, radius, radius, Math.PI, (Math.PI * 3) / 2);

    //上边线
    this.ctx.lineTo(width - radius, 0);

    //右上角圆弧
    this.ctx.arc(width - radius, radius, radius, (Math.PI * 3) / 2, Math.PI * 2);

    //右边线
    this.ctx.lineTo(width, height - radius);
    this.ctx.closePath();
  }

  //根据坐标画刻度
  drawLine = (obj: any, color?: string, width?: number, startY?: number) => {
    // 设置线条的颜色
    this.ctx.strokeStyle = color || 'rgba(0, 0, 0, 0.25)';
    // 设置线条的宽度
    this.ctx.lineWidth = width || 1;
    // 绘制直线
    this.ctx.beginPath();
    // 起点
    this.ctx.moveTo(obj.x, startY || this.top);
    // 终点
    this.ctx.lineTo(obj.x, obj.len + this.top);
    this.ctx.closePath();
    this.ctx.stroke();
  };

  //根据坐标绘制时间
  drawTime = (obj: any, color?: string) => {
    this.ctx.font = '14px Arial';
    this.ctx.fillStyle = color || 'rgba(0, 0, 0, 0.65)';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(obj.time, obj.x, obj.y);
  };

  //canvas点击事件
  clickPoint = (e: any) => {
    const { currentPos } = this.state;
    // 屏幕事件
    var ev: any = window.event || ev;
    // 判断屏幕，减去屏幕中的偏移量
    //offsetLeft会受父级的position属性影响,同理offsetTop也会
    var offsetX = ev.offsetX;
    var offsetY = ev.offsetY;
    this.isPointInsideRect(offsetX, offsetY, currentPos);
  };

  //判断点是否在四边形之内
  isPointInsideRect = (offsetX: any, offsetY: any, rectPoints: Array<any>) => {
    const { width } = this.state;
    var x = offsetX,
      y = offsetY;

    const x1 = rectPoints[0][0] - 5 > 0 ? rectPoints[0][0] - 5 : 0;
    const x2 = rectPoints[1][0] + 5 > width ? width : rectPoints[1][0] + 5;
    const y1 = rectPoints[0][1];
    const y2 = rectPoints[3][1];
    if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
      this.setState({ isDraggingforMoving: true, selectForMoving: { x: offsetX, y: offsetY } });
      return true;
    }
    return false;
  };

  //拖动
  dragCircle = (e: any) => {
    const { isDraggingforMoving, selectForMoving, currentPos, width } = this.state;
    const { setLive, live, setPxValue } = this.props;
    var ev: any = window.event || ev;
    var offsetX = ev.offsetX;
    var offsetY = ev.offsetY;
    // 判断是否可以拖动
    if (isDraggingforMoving) {
      let xOffset = offsetX - selectForMoving.x;
      // let yOffset = offsetY - selectForMoving.y;
      const arr = currentPos;
      const result = arr.map((item: any) => {
        let x = item[0] + xOffset;
        x = x <= this.x ? this.x : x >= width + (this.props.marginWidth / 2 - 20) ? width + (this.props.marginWidth / 2 - 20) : x;
        return [x, item[1]];
      });
      const current = this.getTime(arr[0][0] - this.x);
      this.setState(
        { currentPos: result, selectForMoving: { x: offsetX, y: offsetY }, current },
        () => {
          if (live) {
            setLive && setLive(false)
            setPxValue && setPxValue('HIGH')
          }
          this.reDraw();
        },
      );
    }
  };

  fn = (n: number) => {
    return n >= 10 ? n : `0${n}`;
  };

  getTime = (x: number) => {
    const Alls = (x * 15 * 60) / this.state.gap;
    const h = Math.floor(Alls / 3600);
    const m = Math.floor((Alls % 3600) / 60);
    const s = Math.floor(Alls - h * 3600 - m * 60);
    return `${this.fn(h)}:${this.fn(m)}:${this.fn(s)}`;
  };

  //画出初始图形
  reDraw = () => {
    const { height, width: bgW } = this.props;
    const { width, currentPos, isInCanvas } = this.state
    this.ctx.clearRect(0, 0, bgW, height);
    this.drawRoundRect(this.props.marginWidth / 2, this.top, width, 56, 4, 'rgba(116, 190, 240, 0.15)');
    this.drawBg();
    this.drawLine(
      {
        x: currentPos[0][0],
        len: 60,
      },
      '#74BEF0',
      4,
      this.top - this.haftTop,
    );
    this.drawRoundRect(this.props.marginWidth / 2, this.top, currentPos[0][0] - this.props.marginWidth / 2, 56, 4, 'rgba(116, 190, 240, 0.35)');
    isInCanvas && this.drawTimePosition()
  };

  resetDraw = (draw?: boolean) => {
    const { height, width: bgW } = this.props;
    const { width } = this.state
    this.ctx.clearRect(0, 0, bgW, height);
    this.drawRoundRect(this.props.marginWidth / 2, this.top, width, 56, 4, 'rgba(116, 190, 240, 0.15)');
    this.drawBg();
    this.getPosition(draw);
  };

  //停止拖动
  stopDragging = () => {
    // if(this.state.isDraggingforMoving){
    this.setState({ isDraggingforMoving: false }, () => {
      const { current } = this.state;
      const { date } = this.props
      const stamp = current.split(':');
      const dragTime = moment(date)
        .hour(parseInt(stamp[0]))
        .minute(parseInt(stamp[1]))
        .second(parseInt(stamp[2]));
      if (dragTime > moment()) {
        notification.warn({
          message: I18N.common.Cannot_be_greater_than_the_current_time,
        });
        const current = moment().format('HH:mm:ss');
        this.setState(
          {
            current,
          },
          () => {
            this.resetDraw(true);
            this.props.onChangeTime(current);
          },
        );
      } else {
        this.reDraw();
        this.props.onChangeTime(current);
      }
    });
    // }

  };

  render() {
    const { width, height, disable } = this.props;
    return (
      <div className='timeline'>
        <ErrorBoundary>
          <canvas
            id="canvas"
            width={width}
            height={height}
            ref={this.canvas}
            onMouseDown={!disable ? this.clickPoint : () => { }}
            onMouseMove={!disable ? this.dragCircle : () => { }}
            onMouseUp={!disable ? this.stopDragging : () => { }}
            onMouseOut={!disable ? () => {
              this.setState({
                isInCanvas: false
              }, () => {
                this.stopDragging()
              })
            } : () => { }}
            onMouseOver={!disable ? () => {
              this.drawTimePosition()
              this.setState({
                isInCanvas: true
              })
            } : () => { }}
          ></canvas>
        </ErrorBoundary>
      </div>
    );
  }
}

export default TimeLine;
