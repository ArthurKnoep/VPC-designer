import { Form, Input, Button } from 'antd';
import { CIDR, CIDRRegex, VpcManager } from '../../features';

import styles from './VPCConfig.module.scss';

const { useForm } = Form;

interface Props {
  vpcCidr?: CIDR,
  vpcName?: string,
  readOnly?: boolean
  onChange?: () => void,
}

interface FormData {
  cidr: string,
  name: string,
}

const vpcManager = VpcManager.getInstance();

export function VPCConfig({
  vpcCidr,
  vpcName,
  readOnly = false,
  onChange,
}: Props) {
  const [form] = useForm<FormData>();

  const handleSubmit = (val: FormData) => {
    try {
      const cidr = CIDR.fromString(val.cidr);
      vpcManager.setCIDR(cidr);
      vpcManager.setName(val.name);
      if (onChange) onChange();
    } catch (e) {
      alert(e);
    }
  }

  return (
    <div className={styles.container}>
      <Form
        className={styles.form}
        form={form}
        name="vpcConfig"
        onFinish={handleSubmit}
        layout="inline"
        initialValues={{
          cidr: vpcCidr?.toString() ?? '',
          name: vpcName ?? '',
        }}
      >
        <Form.Item
          name="cidr"
          rules={[
            { required: true, message: 'Enter the VPC CIDR' },
            { pattern: CIDRRegex, message: 'Enter a valid CIDR' }
          ]}
        >
          <Input readOnly={readOnly} placeholder="VPC CIDR (10.0.0.0/16)" />
        </Form.Item>
        <Form.Item name="name">
          <Input readOnly={readOnly} placeholder="VPC Name" />
        </Form.Item>
        <Form.Item shouldUpdate={(prev, curr) => prev.cidr !== curr.cidr}>
          {() => (
            <Button type="primary" htmlType="submit" disabled={readOnly || form.getFieldValue('cidr') === ''}>
              Create
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  )
}
