import React from 'react';

export default function InputReadOnly({ value, label, id, color }) {
    return (
        <div className={`input-field col s3`}>
            <input
                type="text"
                id={id}
                value={value}
                style={{ color: color, fontSize: '1.4rem', fontWeight: 'bold' }}
                readOnly
            />
            <label className={`active`} htmlFor={id}>{label}</label>
        </div>
    )
}