/**
 * An action or computation result from the backend
 * e.g.
 * - classify images
 * - create new person from faces
 * - add photo to person faces
 * - detect faces in photo
 * - processing error
 */

import { ReactNode } from "react";
import { Typography } from "antd";
import { AppstoreAddOutlined, AppstoreTwoTone, ExclamationCircleOutlined, ExclamationCircleTwoTone, FileImageOutlined, FileImageTwoTone, IdcardTwoTone, SmileOutlined, SmileTwoTone, UserAddOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface BaseAction {
  title: string;
  type: string;
  detail: string;
  date: Date;
  responseTime: number;
}

interface Action {
  title: string;
  description: ReactNode;
  responseTime: number; // ms
  date: Date;
  icon: ReactNode;
}

class ClassifyAction implements Action {
  title: string;
  description: ReactNode;
  icon: ReactNode;
  responseTime: number;
  date: Date;

  constructor(filename: string, classifyResult: string[], responseTime: number, date: Date) {
    this.title = `Classified '${filename}'`;
    this.responseTime = responseTime;
    this.date = date;
    this.description = (
      <Text>
        {`Classified ${filename} with tags`}
        <Text code>{String(classifyResult).replace(",", ", ")}</Text>.
      </Text>
    );
    this.icon = <FileImageTwoTone style={{ fontSize: 54 }} twoToneColor="orange" />
  }
}

class NewPersonAction implements Action {
  title: string;
  description: ReactNode;
  icon: ReactNode;
  responseTime: number;
  date: Date;
  constructor(personID: string, photoNames: string[], responseTime: number, date: Date) {
    this.title = `New Person '${personID}'`;
    this.description = (
      <Text>
        Created new person <Text>{personID}</Text>from photos
        <Text code>{String(photoNames).replace(",", ", ")}</Text>.
      </Text>
    )
    this.responseTime = responseTime;
    this.date = date;
    this.icon = <IdcardTwoTone style={{ fontSize: 54 }} twoToneColor="green" />
  }
}

class AddPhotoToPersonAction implements Action {
  title: string;
  description: ReactNode;
  icon: ReactNode;
  responseTime: number;
  date: Date;

  constructor(personName: string, personID: string, photoName: string, responseTime: number, date: Date) {
    this.title = `Add to '${personName}'`;
    this.responseTime = responseTime;
    this.date = date;
    this.description = (
      <Text>
        Added photo <Text code>{photoName}</Text> to existing person{" "}
        <Text>{personName} - </Text>
        <Text code>{personID}</Text>.
      </Text>
    );
    this.icon = <AppstoreTwoTone style={{ fontSize: 54 }} twoToneColor="blue" />
  }
}



class DetectFaceAction implements Action {
  title: string;
  description: ReactNode;
  icon: ReactNode;
  responseTime: number;
  date: Date;

  constructor(photoName: string, boundingBoxes: number[][], responseTime: number, date: Date) {
    this.title = `Detect face`;
    this.responseTime = responseTime;
    this.date = date;
    this.description = (
      <Text>
        {`Detected ${boundingBoxes.length} faces in photo`}
        <Text code>{photoName}</Text> with bounding boxes{" "}
        <Text code>
          {boundingBoxes
            .map(
              ([fromX, fromY, toX, toY]) =>
                `{fromX:${fromX};fromY:${fromY};toX:${toX};toY${toY}}`
            )
            .join(", ")}
        </Text>.
      </Text>
    );
    this.icon = <SmileTwoTone style={{ fontSize: 54 }} twoToneColor="#11dd00" />
  }
}


class ComputeError implements Action {
  title: string;
  description: ReactNode;
  icon: ReactNode;
  responseTime: number;
  date: Date;

  constructor(subject: string, error: string, responseTime: number, date: Date) {
    this.title = `Compute Error`;
    this.responseTime = responseTime;
    this.date = date;
    this.description = (
      <Text>
        Encountered a processing error on subject <Text code>{subject}</Text>.
        Error reponse: <Text code>{error}</Text>.
      </Text>
    );
    this.icon = <ExclamationCircleTwoTone style={{ fontSize: 54 }} twoToneColor="red" />
  }
}


export type { Action, BaseAction };
export { ClassifyAction, NewPersonAction, AddPhotoToPersonAction, DetectFaceAction, ComputeError };