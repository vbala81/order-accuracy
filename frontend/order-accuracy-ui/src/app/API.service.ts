/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import { Observable } from "zen-observable-ts";

export interface SubscriptionResponse<T> {
  value: GraphQLResult<T>;
}

export type __SubscriptionContainer = {
  onCreateORDERS: OnCreateORDERSSubscription;
  onUpdateORDERS: OnUpdateORDERSSubscription;
  onDeleteORDERS: OnDeleteORDERSSubscription;
};

export type CreateORDERSInput = {
  id?: string | null;
  order?: string | null;
  orderdate?: string | null;
  isready?: boolean | null;
  orderissue?: string | null;
};

export type ModelORDERSConditionInput = {
  order?: ModelStringInput | null;
  orderdate?: ModelStringInput | null;
  isready?: ModelBooleanInput | null;
  orderissue?: ModelStringInput | null;
  and?: Array<ModelORDERSConditionInput | null> | null;
  or?: Array<ModelORDERSConditionInput | null> | null;
  not?: ModelORDERSConditionInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null"
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type ModelBooleanInput = {
  ne?: boolean | null;
  eq?: boolean | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type ORDERS = {
  __typename: "ORDERS";
  id: string;
  order?: string | null;
  orderdate?: string | null;
  isready?: boolean | null;
  orderissue?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateORDERSInput = {
  id: string;
  order?: string | null;
  orderdate?: string | null;
  isready?: boolean | null;
  orderissue?: string | null;
};

export type DeleteORDERSInput = {
  id: string;
};

export type ModelORDERSFilterInput = {
  id?: ModelIDInput | null;
  order?: ModelStringInput | null;
  orderdate?: ModelStringInput | null;
  isready?: ModelBooleanInput | null;
  orderissue?: ModelStringInput | null;
  and?: Array<ModelORDERSFilterInput | null> | null;
  or?: Array<ModelORDERSFilterInput | null> | null;
  not?: ModelORDERSFilterInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type ModelORDERSConnection = {
  __typename: "ModelORDERSConnection";
  items: Array<ORDERS | null>;
  nextToken?: string | null;
};

export type ModelSubscriptionORDERSFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  order?: ModelSubscriptionStringInput | null;
  orderdate?: ModelSubscriptionStringInput | null;
  isready?: ModelSubscriptionBooleanInput | null;
  orderissue?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionORDERSFilterInput | null> | null;
  or?: Array<ModelSubscriptionORDERSFilterInput | null> | null;
};

export type ModelSubscriptionIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  in?: Array<string | null> | null;
  notIn?: Array<string | null> | null;
};

export type ModelSubscriptionStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  in?: Array<string | null> | null;
  notIn?: Array<string | null> | null;
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null;
  eq?: boolean | null;
};

export type CreateORDERSMutation = {
  __typename: "ORDERS";
  id: string;
  order?: string | null;
  orderdate?: string | null;
  isready?: boolean | null;
  orderissue?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateORDERSMutation = {
  __typename: "ORDERS";
  id: string;
  order?: string | null;
  orderdate?: string | null;
  isready?: boolean | null;
  orderissue?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type DeleteORDERSMutation = {
  __typename: "ORDERS";
  id: string;
  order?: string | null;
  orderdate?: string | null;
  isready?: boolean | null;
  orderissue?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type GetORDERSQuery = {
  __typename: "ORDERS";
  id: string;
  order?: string | null;
  orderdate?: string | null;
  isready?: boolean | null;
  orderissue?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ListORDERSQuery = {
  __typename: "ModelORDERSConnection";
  items: Array<{
    __typename: "ORDERS";
    id: string;
    order?: string | null;
    orderdate?: string | null;
    isready?: boolean | null;
    orderissue?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null>;
  nextToken?: string | null;
};

export type OnCreateORDERSSubscription = {
  __typename: "ORDERS";
  id: string;
  order?: string | null;
  orderdate?: string | null;
  isready?: boolean | null;
  orderissue?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateORDERSSubscription = {
  __typename: "ORDERS";
  id: string;
  order?: string | null;
  orderdate?: string | null;
  isready?: boolean | null;
  orderissue?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteORDERSSubscription = {
  __typename: "ORDERS";
  id: string;
  order?: string | null;
  orderdate?: string | null;
  isready?: boolean | null;
  orderissue?: string | null;
  createdAt: string;
  updatedAt: string;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async CreateORDERS(
    input: CreateORDERSInput,
    condition?: ModelORDERSConditionInput
  ): Promise<CreateORDERSMutation> {
    const statement = `mutation CreateORDERS($input: CreateORDERSInput!, $condition: ModelORDERSConditionInput) {
        createORDERS(input: $input, condition: $condition) {
          __typename
          id
          order
          orderdate
          isready
          orderissue
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateORDERSMutation>response.data.createORDERS;
  }
  async UpdateORDERS(
    input: UpdateORDERSInput,
    condition?: ModelORDERSConditionInput
  ): Promise<UpdateORDERSMutation> {
    const statement = `mutation UpdateORDERS($input: UpdateORDERSInput!, $condition: ModelORDERSConditionInput) {
        updateORDERS(input: $input, condition: $condition) {
          __typename
          id
          order
          orderdate
          isready
          orderissue
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateORDERSMutation>response.data.updateORDERS;
  }
  async DeleteORDERS(
    input: DeleteORDERSInput,
    condition?: ModelORDERSConditionInput
  ): Promise<DeleteORDERSMutation> {
    const statement = `mutation DeleteORDERS($input: DeleteORDERSInput!, $condition: ModelORDERSConditionInput) {
        deleteORDERS(input: $input, condition: $condition) {
          __typename
          id
          order
          orderdate
          isready
          orderissue
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteORDERSMutation>response.data.deleteORDERS;
  }
  async GetORDERS(id: string): Promise<GetORDERSQuery> {
    const statement = `query GetORDERS($id: ID!) {
        getORDERS(id: $id) {
          __typename
          id
          order
          orderdate
          isready
          orderissue
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetORDERSQuery>response.data.getORDERS;
  }
  async ListORDERS(
    filter?: ModelORDERSFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListORDERSQuery> {
    const statement = `query ListORDERS($filter: ModelORDERSFilterInput, $limit: Int, $nextToken: String) {
        listORDERS(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            order
            orderdate
            isready
            orderissue
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListORDERSQuery>response.data.listORDERS;
  }
  OnCreateORDERSListener(
    filter?: ModelSubscriptionORDERSFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateORDERS">>
  > {
    const statement = `subscription OnCreateORDERS($filter: ModelSubscriptionORDERSFilterInput) {
        onCreateORDERS(filter: $filter) {
          __typename
          id
          order
          orderdate
          isready
          orderissue
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateORDERS">>
    >;
  }

  OnUpdateORDERSListener(
    filter?: ModelSubscriptionORDERSFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateORDERS">>
  > {
    const statement = `subscription OnUpdateORDERS($filter: ModelSubscriptionORDERSFilterInput) {
        onUpdateORDERS(filter: $filter) {
          __typename
          id
          order
          orderdate
          isready
          orderissue
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateORDERS">>
    >;
  }

  OnDeleteORDERSListener(
    filter?: ModelSubscriptionORDERSFilterInput
  ): Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteORDERS">>
  > {
    const statement = `subscription OnDeleteORDERS($filter: ModelSubscriptionORDERSFilterInput) {
        onDeleteORDERS(filter: $filter) {
          __typename
          id
          order
          orderdate
          isready
          orderissue
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    return API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    ) as Observable<
      SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteORDERS">>
    >;
  }
}
