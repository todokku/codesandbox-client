import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Template from '@codesandbox/common/lib/components/Template';
import { LIST_FOLLOWED_TEMPLATES } from '../../queries';
// import { Templates, Title as Divider } from '../elements';
import { Empty, Title } from './elements';

// Would be good to actually have this interface filled out
// Would be better if we could generate types from our GraphQL server
interface ListTemplatesResponse {
  me?: any;
  teams?: any;
}

export const MyFavoriteTemplatesTab = ({ selectTemplate }) => {
  const { data = {} } = useQuery<ListTemplatesResponse>(
    LIST_FOLLOWED_TEMPLATES,
    {
      variables: { showAll: true },
      fetchPolicy: 'cache-and-network',
    }
  );

  return data && data.me && data.me.followedTemplates.length ? (
    <div>
      <div>Templates followed by me</div>
      {data.me.followedTemplates.map(template => (
        <Template
          key={template.id}
          template={template}
          selectTemplate={selectTemplate}
          small={false}
        />
      ))}
      {data.me.teams.map(team => (
        <>
          <div>templates followed bt {team.name} team</div>
          {team.followedTemplates.map(template => (
            <Template
              key={template.id}
              template={template}
              selectTemplate={selectTemplate}
              small={false}
            />
          ))}
        </>
      ))}
    </div>
  ) : (
    <Empty>
      <Title>You haven’t followed any templates yet</Title>
    </Empty>
  );
};
