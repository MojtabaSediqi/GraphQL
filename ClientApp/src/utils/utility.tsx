import { Modal } from 'antd'
import React from 'react'

export const handleErrors = (error: any) => {
    Modal.error({
        title: 'خطای سرور',
        content: 'خطایی در ارتباط با سرور وجود دارد.'
    })
    //Send error to be written in log file.
    // sendErrorToLog(error)
};