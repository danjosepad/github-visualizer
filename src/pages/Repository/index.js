import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters, AiOutlinePlus, AiFillStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { FiLink } from 'react-icons/fi';
import { GrLocation } from 'react-icons/gr';
import { BiGitRepoForked } from 'react-icons/bi';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Lottie from 'react-lottie';
import { Helmet } from 'react-helmet';

// Project imports

import Error404 from '../../assets/404.json';
import api from '../../services/api';
import { colors } from '../../styles/theme';
import {
  Container,
  Content,
  LogoContent,
  LoadingWrapper,
  InfoContent,
  InfoWrapper,
  Form,
  Input,
  Button,
  ReposContent,
  RepoContent,
  Circle,
  RepoInfoContent,
  StyledArrowBack,
  PaginateButton,
  ColumnContainer,
  StyledErrorMessage,
  FormWrapper
} from './styles';
import { H1 as Title, H3 as StyledH3, H4 as RepoTitle, Span } from '../../styles/fonts';


function Repository({ match }) {
  const [loading, setLoading] = useState(true);
  const [organizationData, setOrganizationData] = useState({});
  const [repositories, setRepositories] = useState([]);
  const [listOfLanguages, setListOfLanguages] = useState([]);
  const [hidePaginateButton, setHidePaginateButton] = useState(false);
  const [repoNotFound, setRepoNotFound] = useState(false);

  // Page manager
  const [page, setPage] = useState(1);
  const [endPaginate, setEndPaginate] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const repoName = match.params.repository;

  const loadRepoData = useCallback(
    async () => {

      try {
        const [org, repos] = await Promise.all([
          api.get(`orgs/${repoName}`),
          api.get(`orgs/${repoName}/repos`, {
            params: {
              direction: 'asc',
              per_page: 5,
            }
          }),
        ]);
        console.log({ org, repos })
        setRepositories(repos.data);
        setOrganizationData(org.data);
        setHidePaginateButton(false); // Make sure that everything would be fine
        setLoading(false);
      } catch (error) {
        setRepoNotFound(true);
      }

    },
    [repoName]
  );

  useEffect(() => {
    (async function loadData() {
      await loadRepoData();
    })();
  }, [loadRepoData]);

  const validationSchema = Yup.object({
    // We could use required over here but since as an user experience
    // we don't want the border to go red everythng he deletes text so
    // we may just check if is a string
    repoName: Yup.string()
  })

  const randomColors = [
    'red',
    'green',
    'yellow',
    'blue',
    'orange',
    'pink',
    'purple'
  ]

  const getRandomColor = (language) => {

    const checkIfLanguageAlreadyExists = listOfLanguages.filter(
      lang => lang.language === language
    )

    if (checkIfLanguageAlreadyExists.length > 0) {
      return checkIfLanguageAlreadyExists[0].color
    }

    const getRandomValue = randomColors[
      Math.floor(Math.random() * randomColors.length)
    ];

    setListOfLanguages(langs => [...langs, {
      language,
      color: colors[getRandomValue]
    }]);

    return colors[getRandomValue]
  }

  const handlePaginate = async () => {
    try {
      setIsLoadingMore(true);
      const { data } = await api.get(`orgs/${repoName}/repos`, {
        params: {
          direction: 'asc',
          per_page: 5,
          page: page + 1
        }
      });

      if (data.length === 0) {
        return setEndPaginate(true);
      }

      setPage(count => count + 1)
      setRepositories(repos => [...repos, ...data])
      setIsLoadingMore(false);
    } catch (err) {

    }
  }

  const onSearch = async (values, { setSubmitting, setFieldError }) => {
    setSubmitting(true);
    try {
        const { data: response } = await api.get(`/repos/${repoName}/${values.repoName}`);
        setRepositories([{
         name: response.name,
         description: response.description,
         repoURL: response.login,
         URL: response.avatar_url,
        }])
        setPage(1);
        setEndPaginate(false);
        setHidePaginateButton(true);
    } catch (err) {
      if(err.response.status === 404) {
        setFieldError('repoName', 'Não foi possível encontrar esse repositório')
      } else {
        setFieldError('repoName', err.message)
      }
    }

    setSubmitting(false);
  }

  // We can use JSON as gif using Lottie so we have more performance
  const LottieOptions = {
    loop: true,
    autoplay: true,
    animationData: Error404
  }

  return (
   <>

    {repoNotFound ? (
      <ColumnContainer>
      <Helmet>
        <title>Repo not found</title>
      </Helmet>
        <Lottie
          options={LottieOptions}
          height={300}
          width={300}
        />
        <StyledH3 color={colors.black}>A página que procura não foi encontrada</StyledH3>
      </ColumnContainer>
    ) : (
      <Container>
      <Link to="/">
        <StyledArrowBack data-testid="#redirectButtonBack"/>
      </Link>

      <Content>
      <Helmet>
        <title>{organizationData.name}</title>
      </Helmet>
        {loading ? (
          <LoadingWrapper>
            <AiOutlineLoading3Quarters size="160px" color={colors.green} />
          </LoadingWrapper>
        ) : (
          <>
          <LogoContent data-aos="fade-up">
            <img src={organizationData.avatar_url} alt={`${organizationData.name} avatar`} />
            <Title>{organizationData.name}</Title>
            <StyledH3 color={colors.gray}>
              {organizationData.description}
            </StyledH3>
            <InfoContent>
              {organizationData.location && (
                <InfoWrapper>
                  <GrLocation color={colors.grayLight} />
                  <StyledH3 color={colors.gray}>
                    {organizationData.location}
                  </StyledH3>
                </InfoWrapper>
              )}

              {organizationData.blog && (
                <InfoWrapper>
                  <FiLink color={colors.gray} />
                  <StyledH3 color={colors.gray}>
                    {organizationData.blog}
                  </StyledH3>
                </InfoWrapper>
              )}
            </InfoContent>
          </LogoContent>
          <Formik
            initialValues={{ repoName: '' }}
            validate={ async ({ repoName }) => {
              // Now we know that this will only occur
              // when user searched and successfully found
              // an existing repository
              if (repoName === '' && hidePaginateButton) {
                await loadRepoData();
              }
            }}
            validationSchema={validationSchema}
            onSubmit={onSearch}
          >
            {
            ({
              handleSubmit,
              values,
              isSubmitting,
              handleChange,
              errors
            }) => (
              <Form onSubmit={handleSubmit} data-aos="fade-up">
                <FormWrapper data-testid="#formWrapper">
                  <Input
                    type="text"
                    data-testid="#repoNameInput"
                    name="repoName"
                    placeholder="Buscar repositórios"
                    isError={errors.repoName}
                    onChange={handleChange}
                    value={values.repoName}
                  />
                  <Button
                    type="submit"
                    disabled={values.repoName === '' || isSubmitting}
                    isError={errors.repoName}
                    >
                    <AiOutlinePlus size="25px" color={colors.white} />
                  </Button>
                </FormWrapper>
                <ErrorMessage name="repoName" component={StyledErrorMessage} />
              </Form>
            )}
          </Formik>
          </>
        )}
      <ReposContent data-aos="fade-up" data-aos-delay="500">
        {repositories.map(repo => (
          <RepoContent key={repo.id} data-testid="#repositoryContent">
            <RepoTitle>{repo.name}</RepoTitle>
            <Span>{repo.description}</Span>
            <RepoInfoContent>
              {repo.language && (
                <InfoWrapper>
                  <Circle color={getRandomColor(repo.language)} />
                  <Span isBold>{repo.language}</Span>
                </InfoWrapper>
              )}
              <InfoWrapper>
                <BiGitRepoForked />
                <Span isBold>{repo.forks}</Span>
              </InfoWrapper>
              <InfoWrapper>
                <AiFillStar color={colors.yellow}/>
                <Span isBold>{repo.stargazers_count}</Span>
              </InfoWrapper>
            </RepoInfoContent>
          </RepoContent>
        ))}
      </ReposContent>
      {!hidePaginateButton && (
        <>
          {endPaginate ? (
            <StyledH3 color={colors.gray}>
              Não foi possível encontrar mais repositórios
            </StyledH3>
          ) : (
            <PaginateButton
              type="button"
              onClick={() => handlePaginate()}
              >
                {isLoadingMore ? (
                  <AiOutlineLoading3Quarters size="30px" color={colors.white} />
                ) : 'Carregar'}
              </PaginateButton>
          )}
        </>
      )}

      </Content>
    </Container>
    )}
   </>
  )
}

export default Repository