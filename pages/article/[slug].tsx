import React from "react";
import { Layout } from "@components/layout";
import { config } from "@constants/config";
import { GetStaticPaths, GetStaticProps } from "next";

import { Article as ArticleType } from "types/article";
import Article from "views/article";

export interface DynamicArticleProps {
  article: ArticleType;
  name: string;
  image: string;
}

const DynamicArticle = ({ name, image, article }: DynamicArticleProps) => {
  return (
    <Layout className="mx-0">
      {article && <Article article={article} name={name} image={image} />}
    </Layout>
  );
};

export default DynamicArticle;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ["/article/chicago"],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const url = config.url.API_URL;
  const res = params && (await fetch(`${url}/article/${params.slug}`));
  const resObj = res && (await res.json());

  const { name, image, publishedArticles } = resObj;

  let article = publishedArticles[0];

  // Pass post data to the page via props
  return { props: { name, image, article } };
};
