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


def get_all():
    res = es.search(
        index=conf.INDEX,
        doc_type=conf.TYPE,
        size=conf.SIZE,
        body={"query": {"match_all": {}}},
        )
    return res['hits']['hits']


def search_es(species=None, lifestage=None, location=None):
    res = get_all()
    data = []
    for item in res:
        keep = True
        if species:
            item_species = item['_source']['supported_species']
            if species.lower() not in item_species.lower():
                keep = False
        if lifestage:
            item_lifestage = item['_source']['fish_lifestage']
            if item_lifestage.lower() not in [lifestage.lower(), '', 'all']:
                keep = False
        if location:
            item_location = item['_source']['supplier_location']
            if item_location.lower() != location.lower():
                keep = False
        if keep:
            data.append(item)
    return data


def delete_all():
    return es.delete_by_query(index='_all', body='')

