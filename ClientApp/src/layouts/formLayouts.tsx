import { Button, Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import React from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

interface Props {
    children: React.ReactNode
}

export default function FormLayouyt({ children }: Props) {
    const navigate = useNavigate();
    return (
        <Layout style={{ minHeight: '100%', overflow: 'hidden' }}>
            <Content style={{ padding: '24px', display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '100%', maxWidth: '80%', minHeight: '100vh', maxHeight: '100%', overflow: 'hidden' }}>
                    <Button
                        type="link"
                        icon={<ArrowLeftOutlined />}
                        style={{ marginBottom: 16 }}
                        onClick={() => navigate('/')}
                    >
                        Home
                    </Button>
                    {children}
                </div>
            </Content>
        </Layout>
    )
}