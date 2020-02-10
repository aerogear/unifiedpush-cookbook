import React from 'react';
import { Component } from 'react';
import { Modal, Button } from '@patternfly/react-core';
import { Form, FormGroup, TextInput } from '@patternfly/react-core';

import { PushInitConfig } from '@aerogear/push';
import { Data, Validator } from 'json-data-validator';
import { EvaluationResult } from 'json-data-validator/src/Rule';

import {
  inplaceFormvalidationRules,
  formValidationRules,
} from './validationRules';

/**
 * The properties accepted by this component
 */
interface ConfigureProps {
  /**
   * Whether the window is visible or not
   */
  open: boolean;

  /**
   * The configuration to be edited
   */
  config?: PushInitConfig;

  /**
   * The function to be called with the new configuration
   * @param config The new configuration
   * @param cancel Whether the cancel button was pressed or not
   */
  callback: (config: PushInitConfig, cancel?: boolean) => void;
}

interface ConfigureState {
  validationResult: EvaluationResult;
}

/**
 * This component is the 'configuration' modal window.
 */
export class Configure extends Component<ConfigureProps, ConfigureState> {
  private config: PushInitConfig = {} as PushInitConfig;

  constructor(props: ConfigureProps) {
    super(props);
    this.resetConfig();
    this.state = { validationResult: { valid: true } };
  }

  private resetConfig() {
    this.config = this.props.config
      ? { ...this.props.config }
      : ({} as PushInitConfig);
    if (!this.config.webpush) {
      this.config.webpush = {
        variantID: '',
        variantSecret: '',
      };
    }
  }

  shouldComponentUpdate(nextProps: Readonly<ConfigureProps>): boolean {
    if (nextProps.open !== this.props.open && nextProps.open) {
      this.resetConfig();
    }
    return true;
  }

  private confirm = (cancel: boolean) => {
    if (!(cancel || this.validate().valid)) {
      return;
    }
    this.props.callback(this.config, cancel);
  };

  private validate(inplace = true): EvaluationResult {
    const validationResult = new Validator(
      inplace ? inplaceFormvalidationRules : formValidationRules
    ).validate((this.config as unknown) as Data, true);
    this.setState({ validationResult });
    return validationResult;
  }

  render() {
    return (
      <React.Fragment>
        <Modal
          isSmall
          showClose={false}
          title="Configure UPS Connection"
          isOpen={this.props.open}
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
                value={this.config?.url}
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
                value={this.config?.webpush?.variantID}
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
                value={this.config?.webpush?.variantSecret}
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
                value={this.config?.webpush?.appServerKey}
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
