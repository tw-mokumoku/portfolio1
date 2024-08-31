import { useEffect, useState } from "react";
import { OverlayLoading } from "react-loading-randomizable";
import { HeaderUnion } from "../Component/union/headerUnion";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DashboardUserPanel } from "../Component/union/SectionUnion";
import { useParams } from "react-router-dom";


import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';



const steps = ['サーバーに接続', '招待URLを登録', 'サーバー情報を入力', '最終確認'];

export function ServerStepper() {
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [nextDisabled, setNextDisabled] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);
    const [activeStep, setActiveStep] = React.useState(0);

    const isStepOptional = (step) => {
        return step === 1;
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setNextDisabled(true);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    return (
        <>
            <OverlayLoading active={loading} />
            <HeaderUnion />
            <Container>
                <Row className="mt-5">
                    <Col xl={3}>
                        <DashboardUserPanel />
                    </Col>
                    <Col xl={9} className="h-100">
                        <div className="mb-5">
                            <Stepper activeStep={activeStep}>
                                {steps.map((label, index) => {
                                    return (
                                        <Step key={label}>
                                            <StepLabel>
                                                <div style={{ color: '#dee2e6' }}>
                                                    {label}
                                                </div>
                                            </StepLabel>
                                        </Step>
                                    );
                                })}
                            </Stepper>
                        </div>
                        <div className="server-stepper-body d-flex align-items-center justify-content-center" style={{ height: '500px' }}>
                            <Paper
                                elevation={4}
                                sx={{
                                    bgcolor: '#272b30',
                                    borderRadius: 10,
                                    padding: 2
                                }}
                            >
                                <div className="d-flex align-items-center justify-content-center w-100 h-100"
                                    style={{ color: "white" }}

                                >
                                    サーバーにbotを追加
                                </div>
                            </Paper>
                        </div>
                        {activeStep === steps.length ?
                        <React.Fragment>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button style={{ color: 'rgb(117, 176, 34)' }} href={`/server/${params['id']}`}>サーバーを確認する</Button>
                            </Box>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Button
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                >
                                    戻る
                                </Button>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button
                                    disabled={nextDisabled}
                                    onClick={handleNext}
                                >
                                    {activeStep === steps.length - 1 ? '終了' : '次へ'}
                                </Button>
                            </Box>
                        </React.Fragment>
                        }
                        
                    </Col>
                </Row>
            </Container>
        </>
    );
}