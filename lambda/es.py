import uuid

import boto3
from elasticsearch import Elasticsearch, RequestsHttpConnection
from requests_aws4auth import AWS4Auth

import conf


session = boto3.session.Session()
awsauth = AWS4Auth(
    conf.KEY,
    conf.SECRET,
    conf.REGION,
    'es'
    )
es = Elasticsearch(
    hosts=[{'host': conf.HOST, 'port':443}],
    http_auth=awsauth,
    use_ssl=True,
    verify_certs=True,
    connection_class=RequestsHttpConnection,
    )

def post_to_es(body, id):
    es.index(
        index=conf.INDEX,
        doc_type=conf.TYPE,
        id=id,
        body=body
        )


def get__all():
    res = es.search(
        index=conf.INDEX,
        doc_type=conf.TYPE,
        body={"query": {"match_all": {}}},
        )
    return res['hits']['hits']


def search_es(species=None, lifestage=None, location=None):
    query = {
        "query": {
            "bool": {
                "must": []
                }
            }
        }
    if species:
        query['query']['filtered'] = {
            'filter': {
                'terms': {
                    'supported_species': [
                        species,
                        ]
                    }
                }
            }
    if lifestage:
        query['query']['bool'].setdefault('should', [])
        query['query']['bool']['should'].append({
            "term": {
                "fish_lifestage": lifestage
                }
            })
        query['query']['bool']['should'].append({
            "term": {
                "fish_lifestage": ""
                }
            })
        query['query']['bool']['should'].append({
            "term": {
                "fish_lifestage": "All"
                }
            })
    if location:
        query['query']['bool']['must'].append(
            {'match': {
                'supplier_location': location
                }
            })

    print(query)
    res = es.search(
        index=conf.INDEX,
        doc_type=conf.TYPE,
        body=query,
        )
    return res


def delete_all():
    return es.delete_by_query(index='_all', body='')

