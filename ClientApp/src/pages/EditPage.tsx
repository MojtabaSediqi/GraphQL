import React, { useEffect, useState } from 'react'
import DefineForm from '../components/Form'
import FormViewModel from '../types/FormViewModel'
import FormLayouyt from '../layouts/formLayouts'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { server } from '../services/services'
import { message, Spin } from 'antd'
import { MovieGenre } from '../types/Enums/MovieGenre'
import { handleErrors } from '../utils/utility'
import FormServerModel from '../types/FormServerModel'

interface Props {

}

export default function EditPage({ }: Props) {
    const [initialValues, setInitialValues] = useState<FormViewModel | undefined>(undefined)
    const { Id } = useParams();
    const navigate = useNavigate();
    const [updateMovie] = useMutation(server.Mutations.UPDATE_MOVIE);
    const { data, loading, error } = useQuery(server.Queries.GET_MOVIE, {
        variables: { id: Number(Id) },
    });

    const loadDataMapper = (): FormViewModel => {
        if (!data?.movie) return {} as FormViewModel;
        return {
            Id: data?.movie?.id,
            Name: data?.movie?.name,
            Description: data?.movie?.description,
            Genre: getMovieGenre(data?.movie?.genre),
            LunchDate: data?.movie?.lunchDate,
            Reviews: data?.movie?.reviews || []
        }
    }

    const getMovieGenre = (genre: string): MovieGenre => {
        const foundGenre = Object.keys(MovieGenre)?.filter(i => !isNaN(+i) && MovieGenre[+i].toLowerCase() === genre?.toLowerCase())[0]
        return +foundGenre
    }

    const handleSubmit = async (formData: FormViewModel) => {
        try {
            const savedData = await updateMovie({
                variables: {
                    id: Number(Id),
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

    useEffect(() => {
        if (data?.movie) setInitialValues(loadDataMapper());
    }, [data])

    if (error) return <div>Error: {error.message}</div>
    
    return (
        <Spin spinning={loading && !initialValues}>
            <FormLayouyt>
                {initialValues && <DefineForm initialValues={initialValues} onSubmit={handleSubmit} />}
            </FormLayouyt>
        </Spin>
    )
}