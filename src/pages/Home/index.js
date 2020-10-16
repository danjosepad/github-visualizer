import React, { useState } from 'react';
import { AiOutlineGithub, AiOutlinePlus } from 'react-icons/ai'
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet';

// Project imports

import {
  Container,
  Content,
  LogoContent,
  Form,
  Input,
  Button,
  RepositoriesWrapper,
  RepositoryContainer,
  FormWrapper,
  StyledErrorMessage
 } from './styles';
import { H1 as Title, H4 as OrgName, Span } from '../../styles/fonts';
import { colors } from '../../styles/theme';
import api from '../../services/api';

function Home() {
  const [repositories, setRepositories] = useState([]);

  const onAdd = async (values, { setSubmitting, setFieldError }) => {
    setSubmitting(true);
    try {
      const IsValueDuplicated = repositories.some(repo => repo === values.orgName);

      if (!IsValueDuplicated) {
        const { data: response } = await api.get(`/orgs/${values.orgName}`);
        setRepositories(repos => [...repos, {
         name: response.name,
         description: response.description,
         repoURL: response.login,
         URL: response.avatar_url,
        }])
      }
    } catch (err) {
      if(err.response.status === 404) {
        setFieldError('orgName', 'Não foi possível encontrar essa organização')
      } else {
        setFieldError('orgName', err.message)
      }

    }

    setSubmitting(false);


    // console.log(response)
  }

  const validationSchema = Yup.object({
    // We could use required over here but since as an user experience
    // we don't want the border to go red everythng he deletes text so
    // we may just check if is a string
    orgName: Yup.string()
  })

  return (
    <Container>
      <Helmet>
        <title>Github Visualizer</title>
      </Helmet>
      <Content>
        <LogoContent>
          <AiOutlineGithub size="160px"/>
          <Title>Github Visualizer</Title>
          <Formik
            initialValues={{ orgName: '' }}
            validationSchema={validationSchema}
            onSubmit={onAdd}
          >
            {
            ({
              handleSubmit,
              values,
              isSubmitting,
              handleChange,
              errors
            }) => (
              <Form onSubmit={handleSubmit}>
                <FormWrapper>
                  <Input
                    type="text"
                    name="orgName"
                    placeholder="Adicionar organização"
                    isError={errors.orgName}
                    onChange={handleChange}
                    value={values.orgName}
                  />
                  <Button
                    type="submit"
                    disabled={values.orgName === '' || isSubmitting}
                    isError={errors.orgName}
                    >
                    <AiOutlinePlus size="25px" color={colors.white} />
                  </Button>
                </FormWrapper>
                <ErrorMessage name="orgName" component={StyledErrorMessage} />
              </Form>
            )}
          </Formik>
        </LogoContent>
        <RepositoriesWrapper>
        {repositories.map((repo, idx) => (
          <RepositoryContainer
            key={`${repo} ${idx}`}
            to={`/${repo.repoURL}`}
          >
            <img src={repo.URL} alt={repo.name} />
            <OrgName>{repo.name}</OrgName>
            <Span>{repo.description}</Span>
          </RepositoryContainer>
        ))}
        </RepositoriesWrapper>

      </Content>
    </Container>
  )
}

export default Home