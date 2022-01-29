import { Form, Input, Button } from 'antd';
import { CIDR } from '../../features';

import styles from './VPCConfig.module.scss';

const { useForm } = Form;

interface Props {
  vpcCidr?: CIDR,
  vpcName?: string,
  readOnly?: boolean
  onChange?: (cidr: CIDR, name: string) => void,
}

interface FormData {
  cidr: string,
  name: string,
}

export function VPCConfig({
  vpcCidr,
  vpcName,
  readOnly = false,
  onChange,
}: Props) {
  const [form] = useForm();

  const handleSubmit = (val: FormData) => {
    try {
      const cidr = CIDR.fromString(val.cidr);
      if (onChange) onChange(cidr, val.name);
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
            { pattern: /^([0-9]{1,3}\.){3}[0-9]{1,3}\/([0-9]|[1-2][0-9]|3[0-2])$/igm, message: 'Enter a valid CIDR' }
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
