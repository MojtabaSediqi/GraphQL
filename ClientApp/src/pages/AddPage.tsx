import React from 'react'
import DefineForm from '../components/Form'
import FormViewModel from '../types/FormViewModel'
import FormLayouyt from '../layouts/formLayouts'
import { useMutation } from '@apollo/client';
import { server } from '../services/services';
import { Button, message, Spin } from 'antd';
import { handleErrors } from '../utils/utility';
import FormServerModel from '../types/FormServerModel';
import { useNavigate } from 'react-router-dom';
import { MovieGenre } from '../types/Enums/MovieGenre';

interface Props {

}

export default function AddPage({ }: Props) {
    const navigate = useNavigate();
    const [addMovie, { loading, error }] = useMutation(server.Mutations.ADD_MOVIE);

    const handleSubmit = async (formData: FormViewModel) => {
        try {
            const savedData = await addMovie({
                variables: {
                    movie: { ...submitFormDataMapper(formData) }
                }
            });
            !!savedData && afterSave();
        } catch (err) {
            handleErrors(err)
        }
    }

    const submitFormDataMapper = (formData: FormViewModel): FormServerModel => {
        const { Name, Description, Genre, LunchDate } = formData;
        return {
            name: Name,
            genre: MovieGenre[Genre].toUpperCase(),
            description: Description,
            lunchDate: LunchDate,
        }
    }

    const afterSave = () => {
        message.success('Saved successfully!');
        navigate('/');
    }

    if (!!error) return <div>Error found: {error.message}</div>

    return (
        <Spin spinning={loading}>
            <FormLayouyt>
                <DefineForm initialValues={undefined} onSubmit={handleSubmit} />
            </FormLayouyt>
        </Spin>
    )
}