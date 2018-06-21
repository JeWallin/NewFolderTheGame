class worldObject{
	constructor(position, size)
	{
		this.position 	= position;
		this.size 		= size;
	}
}

var mapstringglobal = undefined;

class MapManager
{
	constructor(gameSize)
	{
		console.log("MapManager constructed");
		this.gameSize = gameSize;
		this.mapString = {};

		this.WorldMap = [];
		// candy
		this.WorldObjects = [];
		// PC and NPC
		this.PlayerStart = [];
	}

	Reset()
	{
		this.mapString = {};

		this.WorldMap = [];
		// candy
		this.WorldObjects = [];
		// PC and NPC
		this.PlayerStart = [];
		mapstringglobal = undefined;
	}

	IsWalkable(x, y)
	{
		if ( y < this.WorldMap.length && !( this.WorldMap[y] === undefined) && x < this.WorldMap[y].length)
			return ( this.WorldMap[y][x].walkable );
		else
			return false;
	}
	
	LoadMap(MapFile)
	{
		this.Reset();
		
		var input = MapFile.target;

	    var reader = new FileReader();

	    reader.onload = function(){
	          mapstringglobal = reader.result;
	          MapIsloaded();
	    };

	    reader.readAsText(input.files[0]);
	}

	NotifySubscribers()
	{
		//console.log("Hi");
		//for( var i = 0; i < this.subscriber.length; i++)
		{
			//this.subscriber[i].Notify(this);
		}

		InitGameNow();
	}

	ResetVarialbes()
	{
		this.WorldObjects.splice(0, this.WorldObjects.length);
		this.PlayerStart.splice(0, this.PlayerStart.length);
	}

	LayoutSize()
	{
		var width 	= 0;
		var height 	= 1;
		var rowDone	= false;

		for( var i = 0; i < this.mapString.length; i++)
		{
			if (!rowDone)
			{
				width += 1;
			}
			if( this.mapString[i] === '\n' )
			{
				height += 1;
				rowDone = true;
			}
		}
		return new vector2d( width, height );
	}

	GenerateMap()
	{
		this.ResetVarialbes();
		this.mapString = mapstringglobal;

		var layoutSize = LayoutSize();
		var x = 0;
		var y = 0;

		this.WorldMap.push([]);

		for (var i = 0; i < this.mapString.length; i++)
		{
			if ( this.mapString[i] === '\n' )
			{
				//Its a new line
				x = -1;
				y += 1;
				this.WorldMap.push([]);
			}
			else if ( this.mapString[i] === 'x')
			{
				var pos = new vector2d( x, y );
				this.WorldMap.push(pos);
			}
			else if (this.mapString[i] === 'p')
			{
				var pos = new vector2d( x, y );
				this.PlayerStart.push(pos);
			}
			x++;
		}
		this.NotifySubscribers();
	}

	// Get

	GetWorldObjects()
	{
		return this.WorldObjects;
	}

	GetPlayerLocations()
	{
		return this.PlayerStart;
	}
}