import { TimePicker as AntdTimePicker } from 'antd';
import dayjs from 'dayjs';

const format = 'HH:mm';

interface ITimePickerProps {
  startTime?: string;
  endTime?: string;
  onChange?: (value: {
    startTime: string;
    endTime: string;
  }) => void;
}

const TimePicker = ({ startTime, endTime, onChange }: ITimePickerProps) => {
  const defaultStartTime = dayjs(startTime || '00:00', format);
  const defaultEndTime = dayjs(endTime || '00:00', format);

  const handleChange = (value: unknown) => {
    onChange?.({
      startTime: (value as dayjs.Dayjs[])[0].format(format),
      endTime: (value as dayjs.Dayjs[])[1].format(format),
    });
  }

  return <AntdTimePicker.RangePicker minuteStep={30} defaultValue={[defaultStartTime, defaultEndTime]} format={format} onChange={handleChange} />;
};

export default TimePicker;