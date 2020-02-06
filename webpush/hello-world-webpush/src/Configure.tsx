import React from 'react';
import { Component } from 'react';
import { Modal, Button } from '@patternfly/react-core';
import {
  Form,
  FormGroup,
  TextInput,
  TextArea,
  FormSelect,
  Checkbox,
  ActionGroup,
  Radio,
} from '@patternfly/react-core';

import { PushInitConfig } from '@aerogear/push';
import { Data, Validator } from 'json-data-validator';
import { EvaluationResult } from 'json-data-validator/src/Rule';

const formValidationRules = {
  ruleSets: [
    {
      fields: {
        url: [
          {
            type: 'VALID_URL',
          },
          {
            type: 'REQUIRED',
          },
        ],
        'webpush.variantID': [
          {
            type: 'isUUID',
          },
          {
            type: 'REQUIRED',
          },
        ],
        'webpush.variantSecret': [
          {
            type: 'isUUID',
          },
          {
            type: 'REQUIRED',
          },
        ],
        'webpush.appServerKey': [
          {
            type: 'REQUIRED',
          },
        ],
      },
    },
  ],
};

interface ConfigureProps {
  open: boolean;
  config?: PushInitConfig;
  callback: (config: PushInitConfig, cancel?: boolean) => void;
}

interface ConfigureState {
  validationResult: EvaluationResult;
}

export class Configure extends Component<ConfigureProps, ConfigureState> {
  private readonly config: PushInitConfig;

  constructor(props: ConfigureProps) {
    super(props);
    this.config = props.config || ({} as PushInitConfig);
    this.state = { validationResult: { valid: true } };
    if (!this.config.webpush) {
      this.config.webpush = {
        variantID: '',
        variantSecret: '',
      };
    }
  }

  private confirm = (cancel: boolean) => {
    this.props.callback(this.config, cancel);
  };

  private validate(): void {
    const validationResult = new Validator(formValidationRules).validate(
      (this.config as unknown) as Data,
      true
    );
    console.log('valid: ', validationResult);
    this.setState({ validationResult });
  }

  componentDidMount(): void {
    this.validate();
  }

  render() {
    return (
      <React.Fragment>
        <Modal
          isSmall
          title="Configure UPS Connection"
          isOpen={this.props.open}
          //onClose={this.toggle}
          actions={[
            <Button
              key="confirm"
              variant="primary"
              isDisabled={
                !!this.state.validationResult &&
                !this.state.validationResult.valid
              }
              onClick={() => this.confirm(false)}
            >
              Confirm
            </Button>,
            <Button
              key="cancel"
              variant="link"
              onClick={() => this.confirm(true)}
            >
              Cancel
            </Button>,
          ]}
          isFooterLeftAligned
        >
          <Form>
            <FormGroup
              label="URL"
              isRequired
              fieldId="ups-url"
              helperText={
                this.state.validationResult?.details?.find(
                  item => item.field === 'url'
                )?.message
              }
            >
              <TextInput
                isRequired
                type="url"
                id="ups-url"
                value={this.props.config?.url}
                onChange={value => {
                  this.config.url = value;
                  this.validate();
                }}
                isValid={
                  !!this.state.validationResult &&
                  !this.state.validationResult?.details?.find(
                    item => item.field === 'url'
                  )
                }
              />
            </FormGroup>
            <FormGroup
              label="Variant ID"
              isRequired
              fieldId="variant-id"
              helperText={
                this.state.validationResult?.details?.find(
                  item => item.field === 'webpush.variantID'
                )?.message
              }
            >
              <TextInput
                isRequired
                type="text"
                id="variant-id"
                value={this.props.config?.webpush?.variantID}
                onChange={value => {
                  this.config.webpush!.variantID = value;
                  this.validate();
                }}
                isValid={
                  !!this.state.validationResult &&
                  !this.state.validationResult?.details?.find(
                    item => item.field === 'webpush.variantID'
                  )
                }
              />
            </FormGroup>
            <FormGroup
              label="Variant Secret"
              isRequired
              fieldId="variant-secret"
              helperText={
                this.state.validationResult?.details?.find(
                  item => item.field === 'webpush.variantSecret'
                )?.message
              }
            >
              <TextInput
                isRequired
                type="text"
                id="variant-secret"
                value={this.props.config?.webpush?.variantSecret}
                onChange={value => {
                  this.config.webpush!.variantSecret = value;
                  this.validate();
                }}
                isValid={
                  !!this.state.validationResult &&
                  !this.state.validationResult?.details?.find(
                    item => item.field === 'webpush.variantSecret'
                  )
                }
              />
            </FormGroup>
            <FormGroup
              label="Application Server Key"
              isRequired
              fieldId="app-server-key"
              helperText={
                this.state.validationResult?.details?.find(
                  item => item.field === 'webpush.appServerKey'
                )?.message
              }
            >
              <TextInput
                isRequired
                type="text"
                id="app-server-key"
                value={this.props.config?.webpush?.appServerKey}
                onChange={value => {
                  this.config.webpush!.appServerKey = value;
                  this.validate();
                }}
                isValid={
                  !!this.state.validationResult &&
                  !this.state.validationResult?.details?.find(
                    item => item.field === 'webpush.appServerKey'
                  )
                }
              />
            </FormGroup>
          </Form>
        </Modal>
      </React.Fragment>
    );
  }
}
