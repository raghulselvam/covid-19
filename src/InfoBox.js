import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import "./InfoBox.css"

function InfoBox({total,cases,active,title, ...props}) {
    return (
          
            <Card onClick={props.onClick}
            className="info">
                <CardContent>
                    <Typography className="title" color="textSecondary">{title}</Typography>
                    <h1 className="case">{total}</h1>
                    <Typography color="textSecondary">{cases}</Typography>
                </CardContent>
            </Card>
            
    )
}

export default InfoBox
