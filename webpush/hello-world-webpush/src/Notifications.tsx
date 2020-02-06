import React from "react";
import { Component } from "react";
import {
    Bullseye,
    EmptyState,
    EmptyStateBody,
    EmptyStateIcon,
    EmptyStateVariant,
    Title,
    Page, PageSection, PageHeader,
    Button
} from '@patternfly/react-core';
import { Table, TableHeader, TableBody } from '@patternfly/react-table';
import { ExclamationCircleIcon, WarningTriangleIcon, CubesIcon, InfoCircleIcon} from '@patternfly/react-icons';
import {
    global_danger_color_200 as globalDangerColor200,
    global_warning_color_100,
} from '@patternfly/react-tokens';
import moment from 'moment';
import {PushInitConfig, PushRegistration} from "@aerogear/push";
import { Configure } from "./Configure";
import "./App.css";

enum STATE { REGISTERED, NOT_REGISTERED, ERROR }

type Notification = {
    priority: string,
    text: string,
    date: Date
}

type NotificationsState = {
    registrationState: STATE,
    error?: string,
    notifications?: Notification[],
    config?: PushInitConfig,
    reconfig?: boolean
}

export class Notifications extends Component<{}, NotificationsState> {

    constructor(props: {}) {
        super(props);

        this.state = {
          registrationState: STATE.NOT_REGISTERED,
        };

        PushRegistration.onMessageReceived((notification) => {
            const notifications = this.state.notifications || [] as Notification[];

            const obj = JSON.parse(notification);
            notifications.push({ priority: obj.priority, text: obj.alert, date: new Date() });

            this.setState({ notifications })
        });
    }

    private register = () => {
        console.log('Registering...');
        new PushRegistration(this.state.config!)
            .register({serviceWorker: 'aerogear-sw.js'})
            .then(() => {
                console.log('Registered!');
                this.setState({ registrationState: STATE.REGISTERED });
            })
            .catch(error => {
                this.setState({ registrationState: STATE.ERROR, error: error.message });
                console.log('Failed: ', error.message, JSON.stringify(error))
            });
    };

    private unregister = () => {
        new PushRegistration(this.state.config!).unregister()
            .then(() => {
                this.setState({ registrationState: STATE.NOT_REGISTERED, notifications: [] as Notification[] });
            })
            .catch(error => {
                this.setState({ registrationState: STATE.ERROR, error: error.message });
            });
    };

    render(): React.ReactElement {

        const renderEmptyTable = ({state, title, message}: {state: string, title: string, message: string}) => {

            const getIcon = () => {
                switch (state) {
                    case 'ERROR': return { icon: ExclamationCircleIcon, color: globalDangerColor200.value };
                    case 'WARNING': return { icon: WarningTriangleIcon, color: global_warning_color_100.value };
                    default: return { icon: CubesIcon };
                }
            };

            return [{
                heightAuto: true,
                cells: [
                    {
                        props: { colSpan: 8 },
                        title: (
                            <Bullseye>
                                <EmptyState variant={EmptyStateVariant.small}>
                                    <EmptyStateIcon icon={getIcon().icon} color={getIcon().color}/>
                                    <Title headingLevel="h2" size="lg">
                                        {title}
                                    </Title>
                                    <EmptyStateBody>
                                        {message}
                                    </EmptyStateBody>
                                </EmptyState>
                            </Bullseye>
                        )
                    },
                ]
            }];
        };

        const getRegisterButton = () => {
          return this.state?.registrationState === STATE.REGISTERED
              ? <Button onClick={this.unregister} >Unregister from UPS</Button>
              : <Button onClick={this.register} >Register to UPS</Button>;
        };

        const Header = (
            <PageHeader
                logo={<a className="navbar-brand" href="https://aerogear.org">AeroGear</a>}
                toolbar={getRegisterButton()}
                avatar={<> | <Button onClick={() => this.setState({reconfig: true})} >Configure</Button> </>}
                showNavToggle = {false}
                isNavOpen={true}
            />
        );

        const getRows = (): any[] => {

            const getIcon = (notification) => notification.priority === 'NORMAL'
                ? <InfoCircleIcon key="icon" color={"blue"}/>
                : <ExclamationCircleIcon key="icon" color={"red"}/>;

            switch (this.state?.registrationState) {
                case STATE.REGISTERED:
                    if (this.state?.notifications?.length! > 0) {
                        return this.state!.notifications!.map( (item: Notification) => {
                            return { cells: [{title: getIcon(item)}, {title: moment(item.date).format("DD-MM-YYYY HH:mm:ss")}, {title: item.text}]}
                        })
                    } else {
                        return renderEmptyTable({ state: 'INFO', title: 'No push messages have been received so far', message: 'Please log into your Aerogear UnifiedPush Server and send some message'});
                    }
                    return [0];
                case STATE.ERROR:
                    return renderEmptyTable({ state: 'ERROR', title: 'An error occurred registering your application', message: this.state.error!});
                default:
                    return renderEmptyTable({ state: 'WARNING', title: 'Web Application not registered', message: `Please click on 'Register to UPS' to connect to the ups.`})
            }
        };
        const columns = [
            { title: 'Priority', props: {width: "60px" }},
            { title: 'Date', props: {width:"200px"}},
            { title: 'Text', props: {colSpan: 8} },
        ];

        return (
            <Page header={Header} >
                <PageSection>
                <Table cells={columns} rows={getRows()} aria-label="Notifications Table">
                    <TableHeader />
                    <TableBody />
                </Table>
                </PageSection>
                <Configure open={!this.state?.config || !!this.state?.reconfig} config={this.state.config} callback={(config: PushInitConfig) => this.setState( {config, reconfig: false})}/>
            </Page>
        );
    }
}