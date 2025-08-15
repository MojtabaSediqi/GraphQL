import React, { useState } from 'react'
import MoviesTable from '../components/Table'
import TablePaginiationConfig from '../types/TablePaginationConfig'
import { Button, Layout, message, Space, Spin } from 'antd'
import { useMutation, useQuery } from '@apollo/client'
import { server } from '../services/services'
import MovieTableViewModel from '../types/MovieTableViewModel'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import FormServerModel from '../types/FormServerModel'

interface Props {

}

export default function HomePage({ }: Props) {
    const [selectedRow, setSelectedRow] = useState<MovieTableViewModel | null>(null);
    const [{ page, pageSize }, setPaginationConfig] = useState<{ page: number, pageSize: number }>({ page: 1, pageSize: 10, });
    const navigate = useNavigate();
    const { data, loading, error, fetchMore, refetch } = useQuery(server.Queries.GET_PAGED_MOVIES, {
        variables: { page, pageSize },
    });
    const [deleteMovie, { loading: deleting }] = useMutation(server.Mutations.DELETE_MOVIE, {
        variables: { id: selectedRow?.Id },
        onCompleted: () => {
            message.success('Deleted successfully', 3);
            refetch();
            setSelectedRow(null)
        },
    });
    const handleChangePagination = (page: number, pageSize: number) => {
        setPaginationConfig({ page, pageSize });
        fetchMore({
            variables: { page, pageSize },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                return fetchMoreResult;
            },
        });
        setSelectedRow(null);
    }

    const getTablePaginationConfig = (): TablePaginiationConfig => {
        return {
            pageSize: pageSize,
            currentPage: page,
            total: data?.getPagedMovies?.totalCount
        }
    }

    const dataSourceMapper = (): MovieTableViewModel[] => {
        return data?.getPagedMovies?.items?.map((i: FormServerModel) => ({
            Id: i?.id,
            Name: i?.name,
            LunchDate: i?.lunchDate,
            Description: i?.description,
            Genre: i?.genre,
            Reviews: !!i?.reviews?.length
        }))
    }

    const handleRowClick = (record: MovieTableViewModel, index: number | undefined) => record && setSelectedRow(record)

    const handleRowDoubleClick = (record: MovieTableViewModel, index: number | undefined) => navigate(`/edit/${record?.Id}`)

    const handleAdd = () => navigate('/add')

    const handleEdit = () => {
        if (selectedRow) navigate(`/edit/${selectedRow?.Id}`);
        setSelectedRow(null);
    }

    const handleDelete = () => deleteMovie()

    if (error) return <div>There are errors ...</div>

    return (
        <Spin spinning={loading} style={{ width: '95vw', height: '90vh', margin: 'auto', padding: 20, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Layout>
                <Layout.Content>
                    <MoviesTable
                        dataSource={dataSourceMapper()}
                        tablePaginationConfig={getTablePaginationConfig()}
                        onPaginationChange={handleChangePagination}
                        onRowClick={handleRowClick}
                        onRowDoubleClik={handleRowDoubleClick}
                        selectedRowKey={selectedRow?.Id}
                    />
                </Layout.Content>
                <Layout.Footer style={{ textAlign: 'right' }}>
                    <Space>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={handleAdd}
                        >
                            Add
                        </Button>

                        <Button
                            type="default"
                            icon={<EditOutlined />}
                            onClick={handleEdit}
                        >
                            Edit
                        </Button>

                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            onClick={handleDelete}
                            loading={deleting}
                        >
                            Delete
                        </Button>
                    </Space>
                </Layout.Footer>
            </Layout>
        </Spin>
    )
}