import { Table, Tag, Tooltip, Card, TableProps } from 'antd';
import React, { useRef } from 'react';
import MovieTableViewModel from '../../types/MovieTableViewModel';
import { CheckCircleTwoTone, CloseCircleTwoTone, CalendarOutlined } from '@ant-design/icons';
import { MovieGenre } from '../../types/Enums/MovieGenre';
import dayjs from 'dayjs';
import TablePaginiationConfig from '../../types/TablePaginationConfig';
import './styles.css';

interface Props {
    dataSource?: MovieTableViewModel[];
    tablePaginationConfig: TablePaginiationConfig;
    onPaginationChange: (page: number, pageSize: number) => void | undefined;
    onRowClick: (record: MovieTableViewModel, index: number | undefined) => void
    onRowDoubleClik: (record: MovieTableViewModel, index: number | undefined) => void
    selectedRowKey: number | undefined
}

export default function MoviesTable({ dataSource, tablePaginationConfig, onPaginationChange, onRowClick, onRowDoubleClik, selectedRowKey }: Props) {
    const column = useRef<TableProps<MovieTableViewModel>['columns']>([
        {
            title: 'ID',
            dataIndex: 'Id',
            key: 'Id',
            width: 70,
            render: (text: number) => <span style={{ fontWeight: 600 }}>{text}</span>,
        },
        {
            title: 'Name',
            dataIndex: 'Name',
            key: 'Name',
            width: 200,
            render: (text: string) => <span style={{ fontWeight: 500, fontSize: 15 }}>{text}</span>,
        },
        {
            title: 'Genre',
            dataIndex: 'Genre',
            key: 'Genre',
            width: 150,
            render: (value: number) =>
                value ? <Tag color="cyan" style={{ fontWeight: 500 }}>{MovieGenre[value] || value}</Tag> : '-',
        },
        {
            title: 'Release Date',
            dataIndex: 'LunchDate',
            key: 'LunchDate',
            width: 150,
            align: 'center',
            render: (value: string) =>
                value ? (
                    <Tooltip title={dayjs(value).format('dddd, MMMM D YYYY')}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', fontSize: 13, color: '#555' }}>
                            <CalendarOutlined style={{ color: '#1890ff' }} />
                            {dayjs(value).format('YYYY-MM-DD')}
                        </span>
                    </Tooltip>
                ) : '-',
        },
        {
            title: 'Description',
            dataIndex: 'Description',
            key: 'Description',
            width: 250,
            ellipsis: { showTitle: true },
        },
        {
            title: 'Has Reviews',
            dataIndex: 'Reviews',
            key: 'Reviews',
            width: 100,
            align: 'center',
            render: (value: boolean) =>
                value ? (
                    <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: 20 }} />
                ) : (
                    <CloseCircleTwoTone twoToneColor="#ff4d4f" style={{ fontSize: 20 }} />
                ),
        },
    ]).current;

    return (
        <Card
            style={{
                width: '100%',
                height: '100%',
                borderRadius: 16,
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                padding: 20,
                backgroundColor: '#fff',
            }}
        >
            <Table
                columns={column}
                dataSource={dataSource}
                pagination={{
                    position: ['bottomCenter'],
                    showSizeChanger: true,
                    pageSizeOptions: [10, 20, 50, 100],
                    onChange: onPaginationChange,
                    total: tablePaginationConfig?.total,
                    pageSize: tablePaginationConfig?.pageSize,
                    current: tablePaginationConfig?.currentPage,
                    showTotal: () => tablePaginationConfig?.total
                }}
                size={'large'}
                bordered={false}
                scroll={{ y: 600, x: 'max-content' }}
                sticky
                onRow={(record, index) => {
                    return {
                        onClick: () => onRowClick(record, index),
                        onDoubleClick: () => onRowDoubleClik(record, index)
                    }
                }}
                rowClassName={record => 
                    record.Id === selectedRowKey ? 'table-row-selected' : ''
                }
            />
        </Card>
    );
}
