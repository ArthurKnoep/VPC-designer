import { Button, Descriptions, Divider, Form, Input, message, Popover } from 'antd';
import { CIDR, CIDRRegex, VpcManager } from '../../../features';

import styles from './VPC.module.scss';

interface Props {
  onCreateSubNet?: (cidr: CIDR) => void,
}

interface FormData {
  subNetCIDR: string,
}

const vpcManager = VpcManager.getInstance();

export function VPC({ onCreateSubNet }: Props) {
  const [form] = Form.useForm<FormData>();

  const handleSubNetCreation = async (val: FormData) => {
    try {
      const subNetCidr = CIDR.fromString(val.subNetCIDR);
      if (!vpcManager.getCIDR().isASubNet(subNetCidr)) {
        message.error({ content: `${val.subNetCIDR} is not a valid subnet in the VPC` });
        return;
      }
      if (onCreateSubNet) onCreateSubNet(subNetCidr);
      form.resetFields();
    } catch (e) {}
  };

  const popover = (
    <>
      <Descriptions size="small" column={1} className={styles.netDescriptions}>
        <Descriptions.Item label="Usage">N/A%</Descriptions.Item>
        <Descriptions.Item label="First address">N/A</Descriptions.Item>
        <Descriptions.Item label="Last address">N/A</Descriptions.Item>
        <Descriptions.Item label="Usable address">N/A</Descriptions.Item>
      </Descriptions>
      <Divider />
      <Form onFinish={handleSubNetCreation} form={form}>
        <Form.Item
          name="subNetCIDR"
          rules={[
            { required: true, message: 'Enter the VPC CIDR' },
            { pattern: CIDRRegex, message: 'Enter a valid CIDR' }
          ]}
        >
          <Input placeholder={"CIDR (10.0.0.0/24)"} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary" size="small">Add subnet</Button>
        </Form.Item>
      </Form>
    </>
  );

  return (
    <div className={styles.vpc}>
      <Popover
        placement="bottom"
        trigger="click"
        title={vpcManager.getName() ?? vpcManager.getCIDR().toString()}
        content={popover}
      >
        <div className={styles.cidr}>
          {vpcManager.getCIDR().toString()}
        </div>
      </Popover>
    </div>
  )
}
