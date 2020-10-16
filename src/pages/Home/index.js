import React, { useState } from 'react';
import { AiOutlineGithub, AiOutlinePlus } from 'react-icons/ai'
import { Formik } from 'formik';
import * as Yup from 'yup';

// Project imports

import {
  Container,
  Content,
  LogoContent,
  Form,
  Input,
  Button,
  RepositoriesWrapper,
  RepositoryContainer
 } from './styles';
import { H1 as Title, H4 as OrgName } from '../../styles/fonts';
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
        console.log(response)
        setRepositories(repos => [...repos, {
         name: response.name,
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
    // we don't want the border to go red everythng he deletes text
    // we may just check if is a string
    orgName: Yup.string()
  })

  return (
    <Container>
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
                <Input
                  type="text"
                  name="orgName"
                  placeholder="Adicionar repositórios"
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
              </Form>
            )}
          </Formik>
        </LogoContent>
        <RepositoriesWrapper>
        {repositories.map((repo, idx) => (
          <RepositoryContainer key={`${repo} ${idx}`} to={`/${repo.name}`}>
            <img src={repo.URL} alt={repo.name} />
            <OrgName>{repo.name}</OrgName>
          </RepositoryContainer>
        ))}
        </RepositoriesWrapper>

      </Content>
    </Container>
  )
}

export default Home