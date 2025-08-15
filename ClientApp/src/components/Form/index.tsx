import { Button, Col, DatePicker, Form, FormProps, Input, Row, Select } from 'antd';
import React from 'react'
import FormViewModel from '../../types/FormViewModel';
import { MovieGenre } from '../../types/Enums/MovieGenre';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';

interface Props extends FormProps<FormViewModel> {
    initialValues?: FormViewModel
    onSubmit: (values: FormViewModel) => void;
}

export default function DefineForm({ initialValues, onSubmit }: Props) {
    const [form] = Form.useForm();

    const genreSelectBuilder = () => {
        return (
            Object.keys(MovieGenre)?.filter(i => !isNaN(+i))?.map(i => (<Select.Option key={i} value={+i}>{MovieGenre[+i]}</Select.Option>))
        )
    }

    return (
        <Form
            form={form}
            initialValues={{
                ...initialValues,
                LunchDate: dayjs(initialValues?.LunchDate)
            }}
            onFinish={onSubmit}
            layout="vertical"
            style={{
                maxWidth: 800,
                margin: "0 auto",
                background: "#fff",
                padding: 24,
                borderRadius: 8,
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
        >
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item label="Movie ID" name="Id">
                        <Input readOnly placeholder='Automatic' />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        label="Name"
                        name="Name"
                        rules={[{ required: true, message: "Please enter the movie name" }]}
                    >
                        <Input placeholder="Enter movie name" />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        label="Release Date"
                        name="LunchDate"
                        rules={[{ required: true, message: "Please select release date" }]}
                    >
                        <DatePicker style={{ width: "100%" }} />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        label="Genre"
                        name="Genre"
                        rules={[{ required: true, message: "Please select a genre" }]}
                    >
                        <Select placeholder="Select movie's genre">
                            {genreSelectBuilder()}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item label="Description" name="Description">
                <TextArea rows={4} placeholder="Write a brief description..." />
            </Form.Item>

            <Form.Item style={{ textAlign: "right", marginTop: 16 }}>
                <Button type="primary" htmlType="submit" size="large">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}