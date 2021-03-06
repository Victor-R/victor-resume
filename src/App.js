import React, { Component } from 'react';
import { Container, Col, Row } from 'reactstrap';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Grow from '@material-ui/core/Grow';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'
import Resume from './Components/Resume';
import './css/App.css';
import { createMuiTheme, MuiThemeProvider, Fab, Switch } from '@material-ui/core';
import { FaJediOrder, FaEmpire, FaLanguage } from 'react-icons/fa';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showResume: false,
            darkMode: true,
            language: 'pt-br'
        }
    }

    // Customiza o componente Paper do materialUI
    paperStyle = () => createMuiTheme({
        typography: {
            useNextVariants: true,
        },
        palette: {
            type: this.state.darkMode ? 'dark' : 'light'
        }
    });


    // Customiza estilos dos botões de MaterialUI
    btnCustomStyles = () => createMuiTheme({
        typography: {
            useNextVariants: true,                  // tipografia padrão do materialUI            
        },
        palette: {
            primary: {
                main: '#22569f'                     // Altera paleta de cores dos botões
            }
        }
    });


    // Customiza o Componente Typography do MaterialUI
    typoCustomStyle = () => createMuiTheme({
        typography: {
            useNextVariants: true,                  // tipografia padrão do materialUI            
        },
        overrides: {
            MuiTypography: {
                colorTextPrimary: {
                    color: this.state.darkMode ? '#fff' : '#000'
                }
            }
        }
    });

    switchCustomStyle = () => createMuiTheme({
        typography: {
            useNextVariants: true,                  // tipografia padrão do materialUI            
        },
        overrides: {
            MuiSwitch: {
                bar: {
                    backgroundColor: this.state.darkMode ? '#424242!Important' : '#fff!Important'
                },
                colorPrimary: {
                    color: this.state.darkMode ? '#424242!Important' : '#2196f3!Important'
                }
            },
        }
    })

    handleBtnShowResume = () => {
        this.setState({
            showResume: !this.state.showResume
        });
    }

    render() {
        return (
            <Container fluid>
                <div className='switch-container'>
                    <MuiThemeProvider theme={this.switchCustomStyle()}>
                        <div className='d-inline-flex align-items-center'>
                            {this.state.darkMode ? <FaEmpire size={35} color='#383535' /> : <FaJediOrder color='#fff' size={35} />}
                            <Switch color='primary' checked={this.state.darkMode} onChange={() => this.setState({ darkMode: !this.state.darkMode })} />
                        </div>
                        <div className='d-inline-flex align-items-center'>
                            {this.state.darkMode ? <FaLanguage size={35} color='#383535' /> : <FaLanguage color='#fff' size={35} />}
                            <Switch
                                color='primary'
                                checked={this.state.language === 'pt-br'}
                                onChange={() => this.setState({ language: this.state.language === 'pt-br' ? 'en-us' : 'pt-br' })}
                            />
                            <Typography variant='button' color='textPrimary'>{this.state.language}</Typography>
                        </div>
                    </MuiThemeProvider>
                </div>
                <MuiThemeProvider theme={this.paperStyle()}>
                    <Grow in={this.state.showResume} mountOnEnter unmountOnExit>
                        <Row className='d-flex justify-content-center'>
                            <Col lg='10' className='mobile-paper'>
                                <Resume handleBtnShowResume={this.handleBtnShowResume} darkMode={this.state.darkMode} language={this.state.language} />
                            </Col>
                        </Row>
                    </Grow>
                    <Grow in={!this.state.showResume} mountOnEnter unmountOnExit>
                        <Row className='d-flex justify-content-center'>
                            <Paper className='mainBack'>
                                <Row className="d-flex align-items-center">
                                    <Col md='3' className='d-flex justify-content-center' style={{ maxWidth: '100%' }}>
                                        <Avatar src="perfil.png" style={{ width: '250px', height: '250px' }} />
                                    </Col>
                                    <Col>
                                        <Row className='justify-content-center'>
                                            <MuiThemeProvider theme={this.typoCustomStyle()}>
                                                <Typography variant='h3' color='textPrimary' style={{ textAlign: 'center' }} gutterBottom>Victor Henrique Ribeiro</Typography>
                                            </MuiThemeProvider>
                                        </Row>
                                        <Row className='d-flex justify-content-center'>
                                            <MuiThemeProvider theme={this.btnCustomStyles()}>
                                                <Fab variant='extended' color='primary' onClick={this.handleBtnShowResume}>{this.state.language === 'pt-br' ? 'Mostrar Mais' : 'Show More'}<KeyboardArrowDown /></Fab>
                                            </MuiThemeProvider>
                                        </Row>
                                    </Col>
                                </Row>
                            </Paper>
                        </Row>
                    </Grow>
                </MuiThemeProvider>
            </Container >
        );
    }
}

export default App;
