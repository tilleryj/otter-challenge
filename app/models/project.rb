class Project < ActiveRecord::Base
  has_many :sheets, dependent: :destroy
  has_many :reviews, dependent: :destroy

  # Move to serializer
  def as_json(*args)
    {
      "versions": [ # The first version needs to be the most recent
        {
          "id": 1,
          "urn": "urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Zm9yZ2UtamF2YS1zYW1wbGUtYXBwLTdpdGw0a2dobmticGZhNjdzcTZxbGRla3d0dHJtYmR2L215LXNhbXBsdC5ydnQ"
          # "urn": "urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Zm9yZ2UtamF2YS1zYW1wbGUtYXBwLTdpdGw0a2dobmticGZhNjdzcTZxbGRla3d0dHJtYmR2L3Jldml0Mi5ydnQ"
        },
        {
          "id": 2,
          "urn": "urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Zm9yZ2UtamF2YS1zYW1wbGUtYXBwLTdpdGw0a2dobmticGZhNjdzcTZxbGRla3d0dHJtYmR2L215LXNhbXBsZS1vbGQucnZ0"
          # "urn": "urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Zm9yZ2UtamF2YS1zYW1wbGUtYXBwLTdpdGw0a2dobmticGZhNjdzcTZxbGRla3d0dHJtYmR2L3Jldml0LnJ2dA"
        }
      ]
    }
  end
end
